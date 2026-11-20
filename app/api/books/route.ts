import { NextRequest, NextResponse } from "next/server";

const GOOGLE_BOOKS_API =
  "https://www.googleapis.com/books/v1/volumes";

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

interface CacheItem {
  data: unknown;
  expiresAt: number;
}

const cache = new Map<string, CacheItem>();

const CACHE_DURATION = 5 * 60 * 1000;

// Google Books maksimal 40 item per request
const MAX_RESULTS_PER_REQUEST = 40;

// Batas pengaman agar aplikasi tidak melakukan request tanpa batas
const MAX_TOTAL_BOOKS = 1000;

async function fetchGoogleBooks(
  query: string,
  startIndex: number
) {
  const params = new URLSearchParams({
    q: query,
    startIndex: String(startIndex),
    maxResults: String(MAX_RESULTS_PER_REQUEST),
    printType: "books",
    orderBy: "relevance",
  });

  if (API_KEY) {
    params.set("key", API_KEY);
  }

  const url = `${GOOGLE_BOOKS_API}?${params.toString()}`;

  let response = await fetch(url, {
    cache: "no-store",
  });

  // Retry sekali jika terkena rate limit
  if (response.status === 429) {
    console.log(
      `Google Books 429 pada startIndex=${startIndex}. Menunggu...`
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    response = await fetch(url, {
      cache: "no-store",
    });
  }

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (response.status === 429) {
    throw new Error(
      "Google Books API sedang membatasi request. Silakan coba lagi nanti."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        "Gagal mengambil data dari Google Books API."
    );
  }

  return data;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json(
        {
          error: "Search query is required",
        },
        {
          status: 400,
        }
      );
    }

    const cacheKey = query.toLowerCase();

    // ==============================
    // CHECK CACHE
    // ==============================

    const cached = cache.get(cacheKey);

    if (
      cached &&
      cached.expiresAt > Date.now()
    ) {
      console.log(
        "Books API: menggunakan cache",
        cacheKey
      );

      return NextResponse.json(cached.data, {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
        },
      });
    }

    console.log(
      `Google Books: mengambil seluruh hasil untuk "${query}"`
    );

    // ==============================
    // REQUEST PERTAMA
    // ==============================

    const firstData = await fetchGoogleBooks(
      query,
      0
    );

    const totalItems = firstData?.totalItems || 0;

    let allBooks = firstData?.items || [];

    console.log(
      `Google Books: ${totalItems} buku ditemukan`
    );

    // ==============================
    // HITUNG TOTAL YANG AKAN DIAMBIL
    // ==============================

    const totalToFetch = Math.min(
      totalItems,
      MAX_TOTAL_BOOKS
    );

    // ==============================
    // PAGINATION OTOMATIS
    // ==============================

    let startIndex = allBooks.length;

    while (
      allBooks.length < totalToFetch &&
      startIndex < totalToFetch
    ) {
      console.log(
        `Google Books: mengambil data ${startIndex} - ${
          startIndex + MAX_RESULTS_PER_REQUEST
        }`
      );

      const pageData = await fetchGoogleBooks(
        query,
        startIndex
      );

      const newBooks = pageData?.items || [];

      // Kalau tidak ada data lagi, hentikan loop
      if (newBooks.length === 0) {
        break;
      }

      allBooks = [
        ...allBooks,
        ...newBooks,
      ];

      startIndex += newBooks.length;

      // Kalau API mengembalikan kurang dari 40,
      // kemungkinan sudah mencapai halaman terakhir.
      if (
        newBooks.length < MAX_RESULTS_PER_REQUEST
      ) {
        break;
      }

      // Sedikit jeda agar tidak terlalu agresif
      await new Promise((resolve) =>
        setTimeout(resolve, 150)
      );
    }

    // ==============================
    // HAPUS DUPLIKAT
    // ==============================

    const uniqueBooks = Array.from(
      new Map(
        allBooks.map((book: any) => [
          book.id,
          book,
        ])
      ).values()
    );

    // ==============================
    // RESPONSE
    // ==============================

    const result = {
      totalItems,
      fetchedItems: uniqueBooks.length,
      items: uniqueBooks,
    };

    // ==============================
    // SIMPAN CACHE
    // ==============================

    cache.set(cacheKey, {
      data: result,
      expiresAt:
        Date.now() + CACHE_DURATION,
    });

    console.log(
      `Google Books selesai: ${uniqueBooks.length} buku berhasil diambil dari ${totalItems}`
    );

    return NextResponse.json(result, {
      headers: {
        "Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error(
      "Books API Route Error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat mengambil data buku.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}
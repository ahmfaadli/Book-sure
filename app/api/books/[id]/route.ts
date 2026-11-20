import { NextRequest, NextResponse } from "next/server";

const GOOGLE_BOOKS_API =
  "https://www.googleapis.com/books/v1/volumes";

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Book ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const params = new URLSearchParams();

    if (API_KEY) {
      params.set("key", API_KEY);
    }

    const queryString = params.toString();

    const url =
      `${GOOGLE_BOOKS_API}/${encodeURIComponent(id)}` +
      (queryString ? `?${queryString}` : "");

    const response = await fetch(url, {
      next: {
        revalidate: 300,
      },
    });

    const data = await response.json();

    if (response.status === 404) {
      return NextResponse.json(
        {
          error: "Buku tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        {
          error:
            "Google Books API sedang membatasi request. Silakan coba lagi nanti.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "30",
          },
        }
      );
    }

    if (!response.ok) {
      console.error(
        "Google Books Detail API Error:",
        response.status,
        data
      );

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Gagal mengambil detail buku dari Google Books API.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error(
      "Book Detail API Route Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat mengambil detail buku.",
      },
      {
        status: 500,
      }
    );
  }
}
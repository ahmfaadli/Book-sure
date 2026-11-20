const BASE_URL = "/api/books";

export interface Book {
  id: string;

  volumeInfo: {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;

    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };

    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];

    language?: string;
    previewLink?: string;
  };
}

export interface BooksResponse {
  totalItems: number;
  items?: Book[];
}

const BOOK_CACHE_KEY = "booksure-books";

export async function searchBooks(
  query: string,
  startIndex = 0
): Promise<BooksResponse> {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return {
      totalItems: 0,
      items: [],
    };
  }

  const params = new URLSearchParams({
    q: cleanQuery,
    startIndex: String(startIndex),
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
        "Gagal mengambil data buku."
    );
  }

  return {
    totalItems: data?.totalItems || 0,
    items: data?.items || [],
  };
}

export function saveBooksToStorage(
  books: Book[]
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(
      BOOK_CACHE_KEY,
      JSON.stringify(books)
    );
  } catch (error) {
    console.error(
      "Gagal menyimpan data buku:",
      error
    );
  }
}

export function getBookFromStorage(
  id: string
): Book | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored =
      sessionStorage.getItem(
        BOOK_CACHE_KEY
      );

    if (!stored) {
      return null;
    }

    const books: Book[] =
      JSON.parse(stored);

    return (
      books.find(
        (book) => book.id === id
      ) || null
    );
  } catch (error) {
    console.error(
      "Gagal membaca data buku:",
      error
    );

    return null;
  }
}
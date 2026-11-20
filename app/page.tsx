"use client";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import BookGrid from "@/components/BookGrid";

import {
  Book,
  searchBooks,
  saveBooksToStorage,
} from "@/services/bookApi";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("fiction");
  const [selectedYear, setSelectedYear] = useState("all");

  const initialLoaded = useRef(false);
  const loadingQuery = useRef<string | null>(null);

  async function loadBooks(query: string) {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    if (loadingQuery.current === cleanQuery) {
      return;
    }

    try {
      loadingQuery.current = cleanQuery;

      setLoading(true);
      setError("");
      setSelectedYear("all");

      const data = await searchBooks(cleanQuery);
      const loadedBooks = data.items || [];

      saveBooksToStorage(loadedBooks);

      setBooks(loadedBooks);
    } catch (error) {
      console.error("Book search error:", error);

      setBooks([]);

      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data buku.";

      setError(message);
    } finally {
      loadingQuery.current = null;
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialLoaded.current) {
      return;
    }

    initialLoaded.current = true;

    loadBooks("fiction");
  }, []);

  function handleSearch(query: string) {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    setSearchQuery(cleanQuery);
    loadBooks(cleanQuery);
  }

  const availableYears = Array.from(
    new Set(
      books
        .map((book) => {
          const publishedDate =
            book.volumeInfo.publishedDate;

          if (!publishedDate) {
            return null;
          }

          const match =
            publishedDate.match(/^\d{4}/);

          return match?.[0] || null;
        })
        .filter(
          (year): year is string =>
            Boolean(year)
        )
    )
  ).sort(
    (a, b) => Number(b) - Number(a)
  );

  const filteredBooks =
    selectedYear === "all"
      ? books
      : books.filter((book) => {
          const publishedDate =
            book.volumeInfo.publishedDate;

          if (!publishedDate) {
            return false;
          }

          const match =
            publishedDate.match(/^\d{4}/);

          return match?.[0] === selectedYear;
        });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />

          <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-20 text-center lg:px-8 lg:pb-10 lg:pt-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
              <Sparkles size={15} />

              Explore books from around the world
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Discover your next
              <span className="block text-slate-500">
                great book.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Search and explore thousands of books,
              authors, and stories from around the
              world in one simple place.
            </p>

            <div className="mt-9">
              <SearchBar
                onSearch={handleSearch}
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
              <BookOpen size={14} />

              Powered by Google Books API
            </div>
          </div>
        </section>

        <section 
         id="explore"
         className="mx-auto max-w-7xl px-5 pt-6 pb-12 lg:px-8 lg:pt-8 lg:pb-16">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {searchQuery === "fiction"
                  ? "Featured Books"
                  : `Results for "${searchQuery}"`}
              </h2>
            </div>

            {!loading && !error && (
              <div className="flex items-center gap-3">
                {availableYears.length > 0 && (
                  <select
                    value={selectedYear}
                    onChange={(event) =>
                      setSelectedYear(
                        event.target.value
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400"
                  >
                    <option value="all">
                      All Years
                    </option>

                    {availableYears.map(
                      (year) => (
                        <option
                          key={year}
                          value={year}
                        >
                          {year}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>
            )}
          </div>

          {loading && (
            <div className="flex min-h-80 items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <LoaderCircle
                  size={30}
                  className="animate-spin"
                />

                <p className="text-sm">
                  Searching books...
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-medium text-red-700">
                {error}
              </p>

              <button
                onClick={() =>
                  loadBooks(searchQuery)
                }
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Try again
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            filteredBooks.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <BookOpen
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-semibold text-slate-900">
                  No books found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {selectedYear === "all"
                    ? "Try another title, author, or ISBN."
                    : `No books were found for ${selectedYear}.`}
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            filteredBooks.length > 0 && (
              <BookGrid
                books={filteredBooks}
              />
            )}
        </section>

        <section
          id="about"
          className="border-t border-slate-200 bg-white"
        >
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 text-sm text-slate-400 lg:px-8">
          <span>
            © 2026 Booksure
          </span>

          <span>
            Explore. Discover. Read.
          </span>
        </div>
      </footer>
    </div>
  );
}
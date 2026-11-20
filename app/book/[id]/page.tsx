"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Globe,
  Hash,
  Library,
  Star,
  User,
} from "lucide-react";

import {
  getBookFromStorage,
  type Book,
} from "@/services/bookApi";

interface BookDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BookDetailPage({
  params,
}: BookDetailPageProps) {
  const [book, setBook] =
    useState<Book | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBook() {
      try {
        const { id } = await params;

        if (!id) {
          throw new Error(
            "ID buku tidak ditemukan."
          );
        }

        const storedBook =
          getBookFromStorage(id);

        if (!mounted) {
          return;
        }

        if (!storedBook) {
          setError(
            "Data buku tidak ditemukan. Silakan kembali ke halaman pencarian dan buka buku dari hasil pencarian."
          );

          setLoading(false);
          return;
        }

        setBook(storedBook);
        setLoading(false);
      } catch (err) {
        console.error(
          "Book detail error:",
          err
        );

        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil detail buku."
        );

        setLoading(false);
      }
    }

    loadBook();

    return () => {
      mounted = false;
    };
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-8 h-5 w-32 animate-pulse rounded bg-slate-200" />

          <div className="grid gap-10 md:grid-cols-[280px_1fr]">
            <div className="mx-auto h-[400px] w-[280px] animate-pulse rounded-2xl bg-slate-200" />

            <div className="space-y-5">
              <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <BookOpen className="h-7 w-7 text-red-500" />
          </div>

          <h1 className="text-xl font-semibold text-slate-900">
            Buku tidak ditemukan
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error ||
              "Data buku tidak tersedia."}
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke pencarian
          </Link>
        </div>
      </main>
    );
  }

  const info = book.volumeInfo;

  const title =
    info.title || "Untitled";

  const authors =
    info.authors?.length
      ? info.authors.join(", ")
      : "Penulis tidak diketahui";

  const image =
    info.imageLinks?.thumbnail ||
    info.imageLinks?.smallThumbnail;

  const description =
    info.description ||
    "Tidak ada deskripsi buku.";

  const isbn =
    info.industryIdentifiers?.find(
      (item) =>
        item.type === "ISBN_13"
    )?.identifier ||
    info.industryIdentifiers?.find(
      (item) =>
        item.type === "ISBN_10"
    )?.identifier;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke pencarian
        </Link>

        {/* Main */}
        <section className="grid gap-10 md:grid-cols-[280px_1fr]">
          {/* Cover */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {image ? (
                <img
                  src={image}
                  alt={`Cover ${title}`}
                  className="h-auto max-h-[430px] w-full object-contain"
                />
              ) : (
                <div className="flex h-[400px] items-center justify-center bg-slate-100">
                  <BookOpen className="h-16 w-16 text-slate-300" />
                </div>
              )}
            </div>

            {info.previewLink && (
              <a
                href={info.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <BookOpen className="h-4 w-4" />
                Lihat Preview Buku
              </a>
            )}
          </div>

          {/* Information */}
          <div>
            {/* Categories */}
            {info.categories &&
              info.categories.length >
                0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {info.categories
                    .slice(0, 4)
                    .map(
                      (
                        category
                      ) => (
                        <span
                          key={
                            category
                          }
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {category}
                        </span>
                      )
                    )}
                </div>
              )}

            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {title}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-slate-600">
              <User className="h-4 w-4" />

              <span className="text-sm">
                {authors}
              </span>
            </div>

            {/* Rating */}
            {info.averageRating && (
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                  <span className="text-sm font-semibold text-amber-700">
                    {info.averageRating.toFixed(
                      1
                    )}
                  </span>
                </div>

                {info.ratingsCount && (
                  <span className="text-sm text-slate-500">
                    {info.ratingsCount.toLocaleString(
                      "id-ID"
                    )}{" "}
                    rating
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900">
                Tentang Buku
              </h2>

              <div
                className="mt-3 text-sm leading-7 text-slate-600"
                dangerouslySetInnerHTML={{
                  __html:
                    description,
                }}
              />
            </div>

            {/* Metadata */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={
                  <Library className="h-4 w-4" />
                }
                label="Penerbit"
                value={
                  info.publisher ||
                  "-"
                }
              />

              <InfoItem
                icon={
                  <Calendar className="h-4 w-4" />
                }
                label="Tanggal Terbit"
                value={
                  info.publishedDate ||
                  "-"
                }
              />

              <InfoItem
                icon={
                  <BookOpen className="h-4 w-4" />
                }
                label="Jumlah Halaman"
                value={
                  info.pageCount
                    ? `${info.pageCount} halaman`
                    : "-"
                }
              />

              <InfoItem
                icon={
                  <Globe className="h-4 w-4" />
                }
                label="Bahasa"
                value={
                  info.language
                    ? info.language.toUpperCase()
                    : "-"
                }
              />

              <InfoItem
                icon={
                  <Hash className="h-4 w-4" />
                }
                label="ISBN"
                value={isbn || "-"}
              />

              <InfoItem
                icon={
                  <Library className="h-4 w-4" />
                }
                label="Kategori"
                value={
                  info.categories?.length
                    ? info.categories.join(
                        ", "
                      )
                    : "-"
                }
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}
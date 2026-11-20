import Link from "next/link";

import {
  BookOpen,
  Star,
} from "lucide-react";

import type { Book } from "@/services/bookApi";

interface BookCardProps {
  book: Book;
}

export default function BookCard({
  book,
}: BookCardProps) {
  const info = book.volumeInfo;

  const title =
    info.title || "Untitled";

  const authors =
    info.authors?.join(", ") ||
    "Penulis tidak diketahui";

  const image =
    info.imageLinks?.thumbnail ||
    info.imageLinks?.smallThumbnail;

  return (
    <Link
      href={`/book/${book.id}`}
      className="group block"
    >
      <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
        {/* Cover */}
        <div className="flex h-[300px] items-center justify-center overflow-hidden bg-slate-100">
          {image ? (
            <img
              src={image}
              alt={`Cover ${title}`}
              className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <BookOpen className="h-14 w-14 text-slate-300" />
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-slate-900">
            {title}
          </h3>

          <p className="mt-2 line-clamp-1 text-sm text-slate-500">
            {authors}
          </p>

          <div className="mt-4 flex items-center justify-between">
            {info.publishedDate ? (
              <span className="text-xs text-slate-400">
                {info.publishedDate}
              </span>
            ) : (
              <span />
            )}

            {info.averageRating ? (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

                <span className="text-xs font-medium text-slate-600">
                  {info.averageRating.toFixed(
                    1
                  )}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}
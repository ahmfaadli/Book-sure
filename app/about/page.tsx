import {
  BookOpen,
  Globe2,
  Search,
  Sparkles,
  Layers3,
} from "lucide-react";

import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />

          <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 lg:px-8 lg:pb-14 lg:pt-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                <Sparkles size={15} />

                About Booksure
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                A simple way to
                <span className="block text-slate-500">
                  explore books.
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Booksure is a simple web application designed
                to help you discover books, authors, and stories
                from around the world in one place.
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Discover books without the complexity.
                </h2>

                <p className="mt-4 leading-7 text-slate-500">
                  Booksure provides a simple and clean experience
                  for exploring books from different authors,
                  categories, and publications.
                </p>

                <p className="mt-3 leading-7 text-slate-500">
                  Instead of navigating through complicated
                  interfaces, Booksure focuses on making the
                  process of finding your next book simple,
                  fast, and enjoyable.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <BookOpen size={21} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  One place for your next discovery
                </h3>

                <p className="mt-2 leading-7 text-slate-500">
                  Search for books by title, author, or ISBN
                  and explore the information available for
                  each book in a clean and focused interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-slate-200 bg-[#f8fafc]">
          <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Layers3 size={17} />

                What you can do
              </div>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Everything you need to explore books.
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Booksure keeps the experience focused on
                discovering and exploring books.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {/* Card 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Search size={19} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  Search books
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Find books by title, author, ISBN, or other
                  relevant search terms.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Globe2 size={19} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  Explore worldwide
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Explore books from different authors,
                  categories, and publications around the world.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <BookOpen size={19} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  Explore details
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  View useful information about each book before
                  deciding what to read next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* API */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
            <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                  Powered by Google Books API
                </h2>

                <p className="mt-3 leading-7 text-slate-500">
                  Booksure uses the Google Books API to retrieve
                  book information and make it available through
                  a simple and accessible interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 text-center lg:px-8 lg:py-12">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Ready to discover your next book?
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Start exploring books and find something worth
                reading.
              </p>

              <a
                href="/"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <BookOpen size={17} />

                Explore Books
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-sm text-slate-400 lg:px-8">
          <span>© 2026 Booksure</span>

          <span>Explore. Discover. Read.</span>
        </div>
      </footer>
    </div>
  );
}
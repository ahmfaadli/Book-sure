"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleExplore(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (pathname === "/") {
      const exploreSection = document.getElementById("explore");

      if (exploreSection) {
        exploreSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    router.push("/#explore");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center">
            <Image
              src="/assets/logo.webp"
              alt="Booksure Logo"
              width={64}
              height={64}
              className="h-16 w-16 scale-150 object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="/#explore"
            onClick={handleExplore}
            className="cursor-pointer transition hover:text-slate-900"
          >
            Explore
          </a>

          <Link
            href="/about"
            className="transition hover:text-slate-900"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

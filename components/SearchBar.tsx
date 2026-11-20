"use client";

import { Search, X } from "lucide-react";
import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({
  onSearch,
  initialValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      return;
    }

    onSearch(value);
  }

  function handleClear() {
    setQuery("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-400 focus-within:shadow-md"
    >
      <Search
        size={20}
        className="ml-3 shrink-0 text-slate-400"
      />

      <input
        type="text"
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search books"
        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="mr-1 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}

      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Search
      </button>
    </form>
  );
}
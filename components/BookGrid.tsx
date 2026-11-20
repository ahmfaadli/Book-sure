import { Book } from "@/services/bookApi";
import BookCard from "./BookCard";

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({
  books,
}: BookGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
import { banner } from "@/assets/images";
import bookApi from "@/core/api/bookApi";
import BookCard from "@/features/books/BookCard";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    bookApi.getBooks({ page: 0, limit: 25 }).then((res) => {
      setBooks(res.data.books);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-50 dark:bg-[#1A1A1A]">
        {/* Left: Text */}
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Read Anywhere, Anytime
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Thousands of ebooks and audiobooks at your fingertips.
          </p>
          <Button label="Start Free" className="p-button-success" />
        </div>

        {/* Right: Mockup */}
        <div className="mt-10 md:mt-0">
          <img
            src={banner}
            alt="Ebook Mockup"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Trending Books */}
      {books.length ? (
        <section className="px-8 py-12 bg-gray-50 dark:bg-[#1A1A1A]">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Trending This Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default HomePage;

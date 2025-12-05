import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/reader?url=${encodeURIComponent(book.download_url)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        group cursor-pointer max-w-xs w-full min-h-[300px]
        p-4 flex flex-col justify-between rounded-2xl
        shadow-xl hover:shadow-2xl transition-all duration-500
        backdrop-blur-xl backdrop-saturate-150
        bg-gradient-to-br from-white/30 via-white/20 to-white/10
        dark:from-gray-800/30 dark:via-gray-800/20 dark:to-gray-800/10
        border border-white/40 dark:border-gray-700/40
        hover:border-white/60 dark:hover:border-gray-600/60
        hover:-translate-y-2
        relative overflow-hidden
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-white/30 before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
        after:absolute after:inset-0 after:rounded-2xl
        after:bg-gradient-to-tl after:from-blue-400/10 after:via-purple-400/10 after:to-pink-400/10
        after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-700
      "
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Top content */}
      <div className="relative z-10">
        {/* Cover */}
        <div className="relative">
          <img
            src={book.cover_url}
            alt={book.title}
            className="rounded-xl mb-4 w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500 shadow-lg"
          />
          {book.is_premium && (
            <span className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-lg backdrop-blur-sm border border-orange-300/50">
              Premium
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold line-clamp-2 text-gray-900 lg:text-sm md:text-sm dark:text-white drop-shadow-sm">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 lg:text-xs md:text-xs drop-shadow-sm">
          {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;

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
        p-4 flex flex-col justify-between rounded-xl
        shadow-xl hover:shadow-2xl transition-shadow duration-300
        backdrop-blur-lg
        bg-white/20 dark:bg-gray-800/20
        border border-white/30 dark:border-gray-700/30
      "
    >
      {/* Top content */}
      <div>
        {/* Cover */}
        <div className="relative">
          <img
            src={book.cover_url}
            alt={book.title}
            className="rounded-lg mb-4 w-full aspect-[3/4] object-cover max-h-content group-hover:scale-105 transition-transform duration-300"
          />
          {book.is_premium && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">
              Premium
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold line-clamp-2 text-gray-900 lg:text-sm md:text-sm dark:text-white">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 lg:text-xs md:text-xs">
          {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;

import { X } from "lucide-react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const trending = [
  { title: "Heated Rivalry", author: "Rachel Reid", rating: 4.5 },
  { title: "Phantasma", author: "Kaylie Smith", rating: 4.3 },
  { title: "Zodiac Academy", author: "Caroline Peckham" },
  { title: "A Little Life", author: "Hanya Yanagihara", rating: 4.4 },
  { title: "House of Flame and Shadow", author: "Sarah J. Maas", rating: 4.5 }
];

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm text-white p-6 overflow-y-auto">
      {/* Close button */}
      <div className="flex justify-end mb-4">
        <Button icon={<X />} className="p-button-text" onClick={onClose} />
      </div>

      {/* Search input */}
      <div className="max-w-xl mx-auto mb-8">
        <InputText
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books, authors, tags..."
          className="w-full p-inputtext-lg"
        />
      </div>

      {/* Trending searches */}
      <h2 className="text-xl font-semibold mb-4">Trending Searches</h2>
      <ul className="space-y-4">
        {trending.map((item, i) => (
          <li key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
              {item.title[0]}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-400">{item.author}</p>
              {item.rating && (
                <p className="text-xs text-yellow-400">⭐ {item.rating}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* View all button */}
      <div className="mt-8 text-center">
        <Button label="View all search results" className="p-button-rounded" />
      </div>
    </div>
  );
};

export default SearchOverlay;

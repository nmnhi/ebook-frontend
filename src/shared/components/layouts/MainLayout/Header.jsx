import { Moon, Sun } from "lucide-react";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-900 shadow-md dark:shadow-lg">
      <div className="w-full mx-auto px-6 py-1 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="text-2xl font-bold tracking-wide flex items-center gap-2"
          >
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="font-semibold text-orange-500">EBook</span>
          </Link>
        </div>

        {/* Right: Navigation + CTA + Theme */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <NavLink
              to="/audiobooks"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold "
                  : "text-gray-900 dark:text-white"
              }
            >
              Audiobooks
            </NavLink>

            <NavLink
              to="/ebooks"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold "
                  : "text-gray-900 dark:text-white"
              }
            >
              eBooks
            </NavLink>

            <NavLink
              to="/categories"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold "
                  : " text-gray-900 dark:text-white"
              }
            >
              Categories
            </NavLink>

            <NavLink
              to="/login"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold "
                  : " text-gray-900 dark:text-white"
              }
            >
              Log In
            </NavLink>
          </nav>

          <Button
            label="Subscribe Now"
            className="font-semibold px-4 text-sm py-2 rounded-full hover:opacity-90 bg-orange-500 dark:bg-orange-500 
            border-none hover:outline-none focus:outline-none hover:bg-orange-600 dark:hover:bg-orange-600 hover:shadow-md focus:shadow-none"
          />

          <Button
            onClick={toggleTheme}
            className="p-button-text bg-none dark:bg-gray-800 dark:text-white text-gray-900 
            dark:hover:bg-gray-700 border-none focus:shadow-none"
            icon={theme === "light" ? <Moon /> : <Sun />}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

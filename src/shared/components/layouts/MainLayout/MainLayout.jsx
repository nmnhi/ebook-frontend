import Header from "./Header";

const MainLayout = ({ children, theme, toggleTheme }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Main content */}
      <main className="flex-grow py-6 px-6">{children}</main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;

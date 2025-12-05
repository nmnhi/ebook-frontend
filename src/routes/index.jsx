import ReaderPage from "@/features/books/pages/ReaderPage";
import HomePage from "@features/home/pages/HomePage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/reader" element={<ReaderPage />} />
  </Routes>
);

export default AppRoutes;

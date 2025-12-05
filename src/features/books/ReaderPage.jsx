import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useSearchParams } from "react-router-dom";

// ✅ Required for text + annotation layers
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ Set up the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ReaderPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pdfUrl = decodeURIComponent(params.get("url") || "");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    setError(error.message);
    setLoading(false);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-4">
        <div className="relative backdrop-blur-xl backdrop-saturate-150 bg-gradient-to-br from-white/40 via-white/30 to-white/20 dark:from-gray-800/40 dark:via-gray-800/30 dark:to-gray-800/20 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 max-w-md overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-orange-400/10 to-pink-400/10 animate-pulse" />

          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400 text-lg font-semibold text-center mb-6">
              No PDF URL provided
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-4">
        <div className="relative backdrop-blur-xl backdrop-saturate-150 bg-gradient-to-br from-white/40 via-white/30 to-white/20 dark:from-gray-800/40 dark:via-gray-800/30 dark:to-gray-800/20 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 max-w-md overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-orange-400/10 to-pink-400/10" />

          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-red-700 dark:text-red-400 font-bold text-xl mb-3 text-center">
              Error Loading PDF
            </h2>
            <p className="text-red-600 dark:text-red-300 text-sm mb-3 text-center">
              {error}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 text-center">
              Failed to load the PDF file. Please check the file URL or try
              again.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pdf-container flex justify-center items-start p-4 pb-24 overflow-y-auto overflow-x-hidden">
      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto flex justify-center items-start p-4">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full">
            {/* Modern liquid glass loader */}
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/20 dark:from-gray-800/40 dark:to-gray-800/20 border border-white/50 dark:border-gray-700/50 shadow-2xl animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-400 animate-spin" />
              <div className="absolute inset-3 rounded-full backdrop-blur-xl bg-gradient-to-br from-orange-400/20 to-pink-400/20" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-6 py-2 rounded-full border border-white/40 dark:border-gray-700/40">
              Loading PDF...
            </p>
          </div>
        )}
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
          className="shadow-lg"
        >
          <Page pageNumber={pageNumber} scale={scale} className="bg-white" />
        </Document>
      </div>

      {/* ✅ Bottom Floating Action Bar */}
      {numPages && (
        <div
          className="
            fixed bottom-6 left-1/2 -translate-x-1/2
            flex items-center gap-3
            px-6 py-4
            rounded-2xl
            shadow-2xl
            z-50
            backdrop-blur-xl backdrop-saturate-150
            bg-gradient-to-r from-white/40 via-white/35 to-white/30
            dark:from-gray-800/40 dark:via-gray-800/35 dark:to-gray-800/30
            border border-white/50 dark:border-gray-700/50
            hover:shadow-3xl transition-all duration-300
            before:absolute before:inset-0 before:rounded-2xl
            before:bg-gradient-to-br before:from-blue-400/10 before:via-purple-400/10 before:to-pink-400/10
          "
        >
          {/* Zoom Out */}
          <button
            onClick={zoomOut}
            className="p-2.5 backdrop-blur-lg bg-white/60 dark:bg-gray-700/60 rounded-xl hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-white/40 dark:border-gray-600/40"
          >
            <ZoomOut size={18} className="text-gray-800 dark:text-gray-200" />
          </button>

          {/* Zoom Percentage */}
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 min-w-[55px] text-center backdrop-blur-sm bg-white/30 dark:bg-gray-700/30 px-3 py-1 rounded-lg">
            {Math.round(scale * 100)}%
          </span>

          {/* Zoom In */}
          <button
            onClick={zoomIn}
            className="p-2.5 backdrop-blur-lg bg-white/60 dark:bg-gray-700/60 rounded-xl hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-white/40 dark:border-gray-600/40"
          >
            <ZoomIn size={18} className="text-gray-800 dark:text-gray-200" />
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent" />

          {/* Previous Page */}
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2.5 backdrop-blur-lg bg-white/60 dark:bg-gray-700/60 rounded-xl hover:bg-white/80 dark:hover:bg-gray-600/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-white/40 dark:border-gray-600/40"
          >
            <ChevronLeft
              size={18}
              className="text-gray-800 dark:text-gray-200"
            />
          </button>

          {/* Page Number Input */}
          <div className="flex items-center gap-2 backdrop-blur-sm bg-white/40 dark:bg-gray-700/40 px-3 py-2 rounded-lg border border-white/40 dark:border-gray-600/40">
            <input
              type="number"
              value={pageNumber}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= numPages) setPageNumber(page);
              }}
              className="w-14 px-2 py-1 rounded-md bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white text-center text-sm font-medium border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
              min="1"
              max={numPages}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              / {numPages}
            </span>
          </div>

          {/* Next Page */}
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2.5 backdrop-blur-lg bg-white/60 dark:bg-gray-700/60 rounded-xl hover:bg-white/80 dark:hover:bg-gray-600/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-white/40 dark:border-gray-600/40"
          >
            <ChevronRight
              size={18}
              className="text-gray-800 dark:text-gray-200"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReaderPage;

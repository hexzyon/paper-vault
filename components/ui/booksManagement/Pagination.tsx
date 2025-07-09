export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
      <div className="text-sm text-gray-500 dark:text-gray-300">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} results
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-dark_grey dark:border-white rounded-md disabled:opacity-50 text-dark_grey dark:text-white"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-dark_grey dark:border-white rounded-md disabled:opacity-50 text-dark_grey dark:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

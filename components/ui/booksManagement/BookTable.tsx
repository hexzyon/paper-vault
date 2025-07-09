import BookRow from "./BookRow";

export default function BookTable({ books }: { books: any[] }) {
  return (
    <div className="overflow-x-auto border border-light_pink dark:border-dark_grey_100 shadow-sm shadow-light_pink dark:shadow-dark_grey_100 p-2">
      <table className="w-full table-auto border-separate border-spacing-y-3 text-left text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-500 dark:bg-dark_grey_400 text-gray-800 dark:text-white text-sm md:text-lg">
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Grade/Level</th>
            <th className="hidden md:table-cell">Language</th>
            <th className="hidden md:table-cell">Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookRow key={book.id} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import FilterBar from "@/components/ui/booksManagement/FilterBar";
import BookTable from "@/components/ui/booksManagement/BookTable";
import Pagination from "@/components/ui/booksManagement/Pagination";
import AddBookModal from "@/components/ui/booksManagement/AddBookModal";
import UserHeader from "@/components/ui/UserHeader";
import { Plus } from "lucide-react";
import appwriteService from "@/appwrite/config";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const [editBook, setEditBook] = useState<any | null>(null); // NEW

  const handleEdit = (book: any) => {
    setEditBook(book);
    setModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await appwriteService.deleteBook(id);
      const updatedBooks = books.filter((b) => b.$id !== id);
      setBooks(updatedBooks);
      setFiltered(updatedBooks);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await appwriteService.getBooks();
        console.log(res);
        const books = await Promise.all(
          res.documents.map(async (book: any) => {
            const shgId = book.subjectsHasGrades.$id;

            return {
              ...book,
              subject: book.subjectsHasGrades.subjects.subject_name,
              grade: book.subjectsHasGrades.grades.grade_name,
              date: new Date(book.$createdAt).toISOString().split("T")[0], // format date
              status: book.status ? "Published" : "Draft",
            };
          })
        );
        setBooks(books);
        setFiltered(books);
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };

    fetchBooks();
  }, [modal]);

  const handleFilter = (filters: any) => {
    let results = books;

    if (filters.search) {
      results = results.filter((b) =>
        b.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.subject) {
      results = results.filter((b) => b.subject === filters.subject);
    }

    if (filters.grade) {
      results = results.filter((b) => b.grade === filters.grade);
    }

    if (filters.status) {
      results = results.filter((b) => b.status === filters.status);
    }

    setCurrentPage(1);
    setFiltered(results);
  };

  const paginatedBooks = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main className="bg-white dark:bg-dark_grey min-h-screen text-black font-anek overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-12 pt-4 max-w-[1440px] w-full mx-auto mb-6">
        <UserHeader />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-6">
          <h1 className="text-2xl flex-1 lg:text-3xl text-center md:text-start 2xl:text-4xl text-dark_brown dark:text-white">
            Books Management
          </h1>
          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center justify-center w-fit bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-base mx-auto md:mx-0"
          >
            <Plus className="mr-2" /> Add New Books
          </button>
        </div>

        <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-lg border border-light_pink dark:border-dark_grey_100 shadow-sm shadow-light_pink dark:shadow-dark_grey_100">
          <FilterBar onFilter={handleFilter} />
          <BookTable
            books={paginatedBooks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filtered.length / pageSize)}
            onPageChange={setCurrentPage}
            indexOfFirstItem={(currentPage - 1) * pageSize}
            indexOfLastItem={currentPage * pageSize}
            totalItems={filtered.length}
          />
        </div>

        {modal && (
  <AddBookModal
    onClose={() => {
      setModal(false);
      setEditBook(null); 
    }}
    existingBook={editBook} 
  />
)}

      </div>
    </main>
  );
}

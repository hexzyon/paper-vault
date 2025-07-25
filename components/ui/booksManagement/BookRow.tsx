import { Pencil, Trash2 } from "lucide-react";

export default function BookRow({
  book,
  onEdit,
  onDelete,
}: {
  book: any;
  onEdit: (book: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b text-sm md:text-md text-gray-700 dark:text-gray-200">
      <td>{book.title}</td>
      <td>{book.subjectsHasGrades.subjects.subject_name}</td>
      <td>{book.subjectsHasGrades.grades.grade_name}</td>
      <td className="hidden md:table-cell">{book.language}</td>
      <td className="hidden md:table-cell">{new Date(book.$createdAt).toISOString().split("T")[0]}</td>
      <td>
        <span className={`text-xs px-2 py-0 rounded ${
          book.status === "Published"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {book.status}
        </span>
      </td>
      <td className="flex gap-1">
        <Pencil
          className="w-4 h-4 text-blue-600 cursor-pointer"
          onClick={() => onEdit(book)}
        />
        <Trash2
          className="w-4 h-4 text-red-600 cursor-pointer"
          onClick={() => onDelete(book.$id)}
        />
      </td>
    </tr>
  );
}

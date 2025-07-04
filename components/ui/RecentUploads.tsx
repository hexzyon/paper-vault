import { Files } from "lucide-react";

const uploads = [
  {
    title: "Lorem ipsum volutpat gravida habitant",
    uploader: "Mr. Kasun",
    time: "2 hours ago",
  },
  {
    title: "Example Paper on Mathematics",
    uploader: "Mrs. Silva",
    time: "1 hour ago",
  },
  {
    title: "Physics Advanced Questions",
    uploader: "Mr. Perera",
    time: "3 hours ago",
  },
  {
    title: "Sample Exam Paper for Biology",
    uploader: "Ms. Fernando",
    time: "4 hours ago",
  },
];

export default function RecentUploads() {
  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500 flex-1">
      <h2 className="text-2xl 2xl:text-4xl text-gray-800 dark:text-white mb-2">Recent Uploads</h2>
      <ul className="space-y-3 text-sm">
        {uploads.map((upload, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <div className="bg-rose-200 dark:bg-gray-300 p-2 2xl:p-3 rounded-full">
              <Files className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-11 2xl:h-11 text-rose-500 dark:text-gray-600" />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-100 text-xl 2xl:text-2xl">{upload.title}</p>
              <span className="text-gray-500 dark:text-gray-300 text-lg 2xl:text-xl">
                Uploaded by {upload.uploader} – {upload.time}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <button className="text-rose-500 dark:text-gray-200 text-2xl 2xl:text-3xl mt-3 text-center w-full">View All Uploads</button>
    </div>
  );
}

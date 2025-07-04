export default function RecentUploads() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex-1">
      <h2 className="font-semibold text-gray-700 mb-2">Recent Uploads</h2>
      <ul className="space-y-3 text-sm">
        {Array.from({ length: 4 }).map((_, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <div className="bg-rose-100 p-2 rounded-full">
              <span className="text-rose-500 font-bold">📄</span>
            </div>
            <div>
              <p className="text-gray-700">Lorem ipsum volutpat gravida habitant</p>
              <span className="text-gray-500">Uploaded by Mr. Kasun – 2 hours ago</span>
            </div>
          </li>
        ))}
      </ul>
      <button className="text-rose-500 font-medium mt-3">View All Uploads</button>
    </div>
  );
}

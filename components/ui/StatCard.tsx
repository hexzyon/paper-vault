import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-dark_grey_500 p-4 rounded-xl 
    shadow-sm shadow-light_pink dark:shadow-dark_grey_100 border border-light_pink dark:border-dark_grey_500
    flex items-center justify-between">
      <div>
        <p className="text-lg lg:text-xl 2xl:text-3xl text-dark_brown dark:text-gray-200">{label}</p>
        <h3 className="text-2xl lg:text-3xl 2xl:text-5xl mt-2 text-dark_brown dark:text-white">{value}</h3>
      </div>
      <div className="bg-rose-200 dark:bg-gray-300 p-2 2xl:p-3 rounded-full">
      <Icon className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-12 2xl:h-12 text-rose-500 dark:text-gray-600" />
      </div>
    </div>
  );
}

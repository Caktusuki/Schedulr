export default function MetricCard({ title, count, subtitle, bgColor, textColor, icon }) {
  return (
    <div className={`${bgColor} dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer w-full`}>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex-1 justify-center items-center">
          <p className="text-md sm:text-lg md:text-xl font-bold text-gray-600 dark:text-gray-200 mb-2">{title}</p>
          <p className={`text-2xl sm:text-3xl font-bold ${textColor} mb-1 text-center`}>{count}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-xl sm:text-2xl opacity-70 ml-4">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

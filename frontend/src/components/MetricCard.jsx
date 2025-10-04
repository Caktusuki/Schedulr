export default function MetricCard({ title, count, subtitle, bgColor, textColor, icon }) {
  return (
    <div className={`${bgColor} rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-1xl font-bold text-gray-600 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${textColor} mb-1`}>{count}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-3xl opacity-70 ml-4">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
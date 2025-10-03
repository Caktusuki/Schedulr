export default function TaskFilter({ filters = {}, onFilterChange, taskCounts = {} }) {
  // Provide default values to prevent undefined errors
  const safeFilters = {
    search: '',
    priority: 'all',
    status: 'all',
    sortBy: 'deadline',
    ...filters
  };

  const safeCounts = {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    ...taskCounts
  };

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'deadline', label: 'Sort by Deadline' },
    { value: 'priority', label: 'Sort by Priority' },
    { value: 'name', label: 'Sort by Name' },
    { value: 'created', label: 'Sort by Created Date' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Tasks
          </label>
          <input
            type="text"
            value={safeFilters.search}
            onChange={(e) => onFilterChange && onFilterChange({ search: e.target.value })}
            placeholder="Search by name or description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={safeFilters.priority}
            onChange={(e) => onFilterChange && onFilterChange({ priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={safeFilters.status}
            onChange={(e) => onFilterChange && onFilterChange({ status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={safeFilters.sortBy}
            onChange={(e) => onFilterChange && onFilterChange({ sortBy: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Counts */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{safeCounts.total}</span> Total Tasks
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-yellow-600">{safeCounts.pending}</span> Pending
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-blue-600">{safeCounts.inProgress}</span> In Progress
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-green-600">{safeCounts.completed}</span> Completed
        </div>
      </div>
    </div>
  );
}
export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const deadline = new Date(task.deadline);
    return deadline < today && task.status !== 'completed';
  };

  const getDaysUntilDeadline = () => {
    const today = new Date();
    const deadline = new Date(task.deadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntilDeadline();

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 transition hover:shadow-lg border-l-4 ${
      isOverdue() ? 'border-l-red-500' : 
      task.status === 'completed' ? 'border-l-green-500' :
      'border-l-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Task Header */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-lg font-semibold ${
              task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.name}
            </h3>
            
            {/* Priority Badge */}
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            
            {/* Status Badge */}
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
              {task.status === 'in-progress' ? 'In Progress' : 
               task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Deadline Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-1 ${
              isOverdue() ? 'text-red-600' :
              daysUntil <= 3 ? 'text-orange-600' :
              'text-gray-500'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Due: {formatDate(task.deadline)}</span>
              {isOverdue() && <span className="font-medium">(Overdue)</span>}
              {!isOverdue() && daysUntil >= 0 && (
                <span className="text-gray-400">
                  ({daysUntil === 0 ? 'Today' : 
                    daysUntil === 1 ? 'Tomorrow' : 
                    `${daysUntil} days left`})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-4">
          {/* Toggle Status */}
          <button
            onClick={() => onToggleStatus(task)}
            className={`p-2 rounded-lg transition-colors ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {task.status === 'completed' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

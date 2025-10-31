export default function TaskItem({ task, onShowDetails, onEdit, onDelete, onToggleStatus }) {
  const priorityColors = {
    Low: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700',
    High: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
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

  const getRecurrenceInfo = (task) => {
    if (!task.isRecurring && !task.isInstance) return null;

    if (task.isInstance) {
      return {
        icon: '🔄',
        text: 'Recurring Task Instance',
        color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700'
      };
    }

    if (task.isRecurring && task.recurrence) {
      const { type, interval } = task.recurrence;
      let text = interval === 1 ? `Every ${type}` : `Every ${interval} ${type}${interval > 1 ? 's' : ''}`;
      return {
        icon: '🔄',
        text,
        color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700'
      };
    }

    return null;
  };

  const recurrenceInfo = getRecurrenceInfo(task);

  return (
    <article 
    className={`bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-4 transition hover:shadow-lg border-l-4 ${
      isOverdue() ? 'border-l-red-500' : 
      task.status === 'completed' ? 'border-l-green-500' :
      'border-l-blue-500'
    } ${task.isInstance ? 'bg-gradient-to-r from-blue-50 to-white dark:from-blue-900 dark:to-gray-900' : ''}`}
    role="group"
    aria-labelledby={`task-title-${task.id}`}
    aria-describedby={`task-desc-${task.id}`}
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 id={`task-title-${task.id}`} className={`text-sm sm:text-md md:text-lg font-semibold ${
              task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-blue-700 dark:text-blue-400'
            }`}>
              {task.name}
            </h3>

            {/* Priority Badge */}
            <span 
            className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}
            role="status"
            aria-label={`Priority: ${task.priority}`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>

            {/* Status Badge */}
            <span 
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}
            role="status"
            aria-label={`Status: ${task.status}`}
            >
              {task.status === 'in-progress' ? 'In Progress' : 
               task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>

            {recurrenceInfo && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${recurrenceInfo.color}`}>
                {recurrenceInfo.icon} {recurrenceInfo.text}
              </span>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <p id={`task-desc-${task.id}`} className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Deadline Info */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className={`flex items-center gap-1 ${
              isOverdue() ? 'text-red-600 dark:text-red-400' :
              daysUntil <= 3 ? 'text-orange-600 dark:text-orange-400' :
              'text-gray-500 dark:text-gray-400'
            }`}>
              📅 Due: {formatDate(task.deadline)}
              {isOverdue() && <span className="font-medium">(Overdue)</span>}
              {!isOverdue() && daysUntil >= 0 && (
                <span className="text-gray-400 dark:text-gray-500">
                  ({daysUntil === 0 ? 'Today' : 
                    daysUntil === 1 ? 'Tomorrow' : 
                    `${daysUntil} days left`})
                </span>
              )}
            </div>

            {task.isRecurring && task.recurrence?.endDate && (
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                🏁 Ends: {formatDate(task.recurrence.endDate)}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 ml-4">
          {task.isInstance && (
            <span className="text-xs text-blue-600 dark:text-blue-200 font-medium px-2 py-1 bg-blue-50 dark:bg-blue-900 rounded">
              Instance
            </span>
          )}

          {onShowDetails && (
            <button 
              onClick={() => onShowDetails(task)}
              className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 text-xs transition focus-visible:outline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              aria-label={`View details of task ${task.name}`}
            >
              Details
            </button>
          )}

          {onToggleStatus && (
            <button
              onClick={() => onToggleStatus(task)}
              className={`p-2 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 ${
                task.status === 'completed' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-600 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              aria-label={task.status === 'completed' 
                ? `Mark ${task.name} as pending` 
                : `Mark ${task.name} as completed`}
            >
              ✔
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-100 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              aria-label={`Edit task ${task.name}`}
            >
              ✏️
            </button>
          )}

          <button 
            onClick={() => onDelete(task)}
            className="px-3 py-1 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
            aria-label={`Delete task ${task.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

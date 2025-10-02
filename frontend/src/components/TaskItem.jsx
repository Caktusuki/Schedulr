export default function TaskItem({ task, onShowDetails, onEdit, onDelete, onToggleStatus }) {
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

  const getRecurrenceInfo = (task) => {
    if (!task.isRecurring && !task.isInstance) return null;

    if (task.isInstance) {
      return {
        icon: '🔄',
        text: 'Recurring Task Instance',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      };
    }

    if (task.isRecurring && task.recurrence) {
      const { type, interval } = task.recurrence;
      let text = interval === 1 ? `Every ${type}` : `Every ${interval} ${type}${interval > 1 ? 's' : ''}`;
      return {
        icon: '🔄',
        text,
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      };
    }

    return null;
  };

  const recurrenceInfo = getRecurrenceInfo(task);

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 transition hover:shadow-lg border-l-4 ${
      isOverdue() ? 'border-l-red-500' : 
      task.status === 'completed' ? 'border-l-green-500' :
      'border-l-blue-500'
    } ${task.isInstance ? 'bg-gradient-to-r from-blue-50 to-white' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className={`text-lg font-semibold ${
              task.status === 'completed' ? 'line-through text-gray-500' : 'text-blue-700'
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

            {recurrenceInfo && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${recurrenceInfo.color}`}>
                {recurrenceInfo.icon} {recurrenceInfo.text}
              </span>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Deadline Info */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className={`flex items-center gap-1 ${
              isOverdue() ? 'text-red-600' :
              daysUntil <= 3 ? 'text-orange-600' :
              'text-gray-500'
            }`}>
              📅 Due: {formatDate(task.deadline)}
              {isOverdue() && <span className="font-medium">(Overdue)</span>}
              {!isOverdue() && daysUntil >= 0 && (
                <span className="text-gray-400">
                  ({daysUntil === 0 ? 'Today' : 
                    daysUntil === 1 ? 'Tomorrow' : 
                    `${daysUntil} days left`})
                </span>
              )}
            </div>

            {task.isRecurring && task.recurrence?.endDate && (
              <div className="text-gray-500 text-xs">
                🏁 Ends: {formatDate(task.recurrence.endDate)}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          {task.isInstance && (
            <span className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-50 rounded">
              Instance
            </span>
          )}

          {onShowDetails && (
            <button 
              onClick={() => onShowDetails(task)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs transition"
            >
              Details
            </button>
          )}

          {onToggleStatus && (
            <button
              onClick={() => onToggleStatus(task)}
              className={`p-2 rounded-lg transition-colors ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
            >
              ✔
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              title="Edit task"
            >
              ✏️
            </button>
          )}

          <button 
            onClick={() => onDelete(task)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

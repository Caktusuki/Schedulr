import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function TaskForm({ task, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    deadline: task?.deadline || '',
    priority: task?.priority || 'Medium',
    status: task?.status || 'pending',
    isRecurring: task?.isRecurring || false,
    recurrence: {
      type: task?.recurrence?.type || 'daily',
      interval: task?.recurrence?.interval || 1,
      endDate: task?.recurrence?.endDate || '',
      ...task?.recurrence,
    },
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Task name is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today)
        newErrors.deadline = 'Deadline cannot be in the past';
    }

    if (formData.isRecurring) {
      if (formData.recurrence.interval < 1)
        newErrors.interval = 'Interval must be at least 1';
      if (formData.recurrence.endDate) {
        const endDate = new Date(formData.recurrence.endDate);
        const startDate = new Date(formData.deadline);
        if (endDate <= startDate)
          newErrors.endDate = 'End date must be after the start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...task,
        ...formData,
        id: task?.id || Date.now(),
        createdAt: task?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'isRecurring') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('recurrence.')) {
      const recurrenceField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        recurrence: {
          ...prev.recurrence,
          [recurrenceField]: type === 'number' ? parseInt(value) || 1 : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name] || errors[name.split('.')[1]]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
        [name.split('.')[1]]: '',
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/30 dark:bg-gray-800/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg overflow-y-auto max-h-[90vh] transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {task ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500 transition-colors"
          >
            <AiOutlineClose size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Task Name *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task name"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.title ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              } focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter task description (optional)"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.deadline ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none`}
            />
            {errors.deadline && (
              <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Recurring Task Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Make this a recurring task
            </span>
          </div>

          {/* Recurrence Settings */}
          {formData.isRecurring && (
            <div className="border-l-4 border-blue-300 dark:border-blue-700 pl-4 space-y-3 bg-blue-50/60 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-blue-700 dark:text-blue-400 font-medium text-sm">
                🔁 Recurrence Settings
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Interval
                  </label>
                  <input
                    type="number"
                    name="recurrence.interval"
                    value={formData.recurrence.interval}
                    onChange={handleChange}
                    min="1"
                    max="365"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.interval ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
                  />
                  {errors.interval && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.interval}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Period
                  </label>
                  <select
                    name="recurrence.type"
                    value={formData.recurrence.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  >
                    <option value="daily">Day(s)</option>
                    <option value="weekly">Week(s)</option>
                    <option value="monthly">Month(s)</option>
                    <option value="yearly">Year(s)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  End Date (optional)
                </label>
                <input
                  type="date"
                  name="recurrence.endDate"
                  value={formData.recurrence.endDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.endDate ? 'border-red-500 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>
          )}

          {/* Status (only for editing) */}
          {task && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-400 dark:bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

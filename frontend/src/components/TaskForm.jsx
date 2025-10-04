import { useState } from 'react';

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
      ...task?.recurrence
    }
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task name is required';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }

    // Validate recurring task fields
    if (formData.isRecurring) {
      if (formData.recurrence.interval < 1) {
        newErrors.interval = 'Interval must be at least 1';
      }
      
      if (formData.recurrence.endDate) {
        const endDate = new Date(formData.recurrence.endDate);
        const startDate = new Date(formData.deadline);
        
        if (endDate <= startDate) {
          newErrors.endDate = 'End date must be after the start date';
        }
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
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'isRecurring') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name.startsWith('recurrence.')) {
      const recurrenceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        recurrence: {
          ...prev.recurrence,
          [recurrenceField]: type === 'number' ? parseInt(value) || 1 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name] || errors[name.split('.')[1]]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        [name.split('.')[1]]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 scrollbar-hide">
      <div className="mt-6 max-h-[100vh] bg-white rounded-lg shadow-xl w-full max-w-md overflow-y-scroll scrollbar-hide">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {task ? 'Edit Task' : 'Add New Task'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Name *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter task name"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description (optional)"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.deadline ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Recurring Task Toggle */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Make this a recurring task
                </span>
              </label>
            </div>

            {/* Recurring Task Options */}
            {formData.isRecurring && (
              <div className="border-l-4 border-blue-200 pl-4 space-y-3">
                <div className="text-sm font-medium text-blue-700 mb-2">
                  🔄 Recurring Settings
                </div>
                
                {/* Recurrence Type and Interval */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Repeat every
                    </label>
                    <input
                      type="number"
                      name="recurrence.interval"
                      value={formData.recurrence.interval}
                      onChange={handleChange}
                      min="1"
                      max="365"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.interval ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.interval && <p className="text-red-500 text-xs mt-1">{errors.interval}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Period
                    </label>
                    <select
                      name="recurrence.type"
                      value={formData.recurrence.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Day(s)</option>
                      <option value="weekly">Week(s)</option>
                      <option value="monthly">Month(s)</option>
                      <option value="yearly">Year(s)</option>
                    </select>
                  </div>
                </div>

                {/* End Date (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="recurrence.endDate"
                    value={formData.recurrence.endDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.endDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for indefinite recurring
                  </p>
                </div>

                {/* Recurrence Preview */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Preview:</strong> This task will repeat every{' '}
                    {formData.recurrence.interval > 1 ? formData.recurrence.interval : ''}{' '}
                    {formData.recurrence.type.replace('ly', '').replace('dai', 'day')}{formData.recurrence.interval > 1 ? 's' : ''}
                    {formData.recurrence.endDate && (
                      <> until {new Date(formData.recurrence.endDate).toLocaleDateString()}</>
                    )}
                    {!formData.recurrence.endDate && <> indefinitely</>}
                  </p>
                </div>
              </div>
            )}

            {/* Status (only show when editing) */}
            {task && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {task ? 'Update Task' : 'Create Task'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
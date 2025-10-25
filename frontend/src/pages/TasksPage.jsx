import { useState } from 'react';
import TaskItem from '../components/TaskItem.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskFilter from '../components/TaskFilter.jsx';
import { useTaskContext } from '../hooks/useTaskContext.js';

export default function TasksPage() {
  const { 
    tasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus, 
    getTaskStats 
  } = useTaskContext();
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    status: 'all',
    sortBy: 'deadline'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };



  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskToDelete) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskToDelete.id);
    }
  };

  const handleToggleStatus = (taskToToggle) => {
    toggleTaskStatus(taskToToggle.id);
  };

  const handleShowDetails = (task) => {
    alert(`Task Details:\n\nName: ${task.name}\nDescription: ${task.description}\nDeadline: ${task.deadline}\nPriority: ${task.priority}\nStatus: ${task.status}`);
  };

  const filteredTasks = tasks
    .filter(task => {
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || (task.priority && task.priority === filters.priority);
      const matchesSearch = (task.name?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
                           (task.description?.toLowerCase() || '').includes(filters.search.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'priority': {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'deadline':
        default:
          return new Date(a.deadline) - new Date(b.deadline);
      }
    });

  const taskStats = getTaskStats();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div>
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Tasks</h1>
          <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300">
            Manage and track your tasks efficiently.
          </p>
        </div>
  
        {/* Stats Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">

            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</h3>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{taskStats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">

            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
            <p className="text-xl sm:text-2xl font-bold text-orange-600">{taskStats.pending}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">

            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</h3>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">

            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h3>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{taskStats.completed}</p>
          </div>
        </div>
  
        {/* Controls */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"

          >
            Add New Task
          </button>
          <TaskFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            taskCounts={taskStats}
          />
        </div>
  
        {/* Tasks List */}
        <div>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-md md:text-lg mb-2">
                {filters.search || filters.status !== 'all' || filters.priority !== 'all'
                  ? 'No tasks match your criteria'
                  : 'No tasks yet'}
              </div>
              <div className="text-gray-400 dark:text-gray-500 text-sm">
                {filters.search || filters.status !== 'all' || filters.priority !== 'all'
                  ? 'Try adjusting your search or filter'
                  : 'Click "Add New Task" to get started'}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onShowDetails={handleShowDetails}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </div>
  
        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
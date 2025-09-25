import { useState, useEffect } from 'react';
import TaskItem from "../components/TaskItem.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskFilter from "../components/TaskFilter.jsx";

// Initial sample tasks with more complete data
const initialTasks = [
  { 
    id: 1, 
    name: "Design UI Components", 
    description: "Create reusable UI components for the task management system",
    deadline: "2025-09-30", 
    priority: "high", 
    status: "in-progress",
    createdAt: "2025-09-20T10:00:00Z",
    updatedAt: "2025-09-23T14:30:00Z"
  },
  { 
    id: 2, 
    name: "Setup Backend API", 
    description: "Initialize Flask/FastAPI backend with database integration",
    deadline: "2025-10-05", 
    priority: "medium", 
    status: "pending",
    createdAt: "2025-09-21T09:15:00Z",
    updatedAt: "2025-09-21T09:15:00Z"
  },
  { 
    id: 3, 
    name: "Integrate Authentication", 
    description: "Add user authentication and authorization system",
    deadline: "2025-10-10", 
    priority: "high", 
    status: "pending",
    createdAt: "2025-09-22T16:45:00Z",
    updatedAt: "2025-09-22T16:45:00Z"
  },
  { 
    id: 4, 
    name: "Write Documentation", 
    description: "Create comprehensive documentation for the project",
    deadline: "2025-09-28", 
    priority: "low", 
    status: "completed",
    createdAt: "2025-09-18T11:20:00Z",
    updatedAt: "2025-09-24T08:00:00Z"
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    status: 'all',
    sortBy: 'deadline'
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('schedulr-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('schedulr-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? taskData : task
      ));
    } else {
      // Add new task
      setTasks(prev => [...prev, taskData]);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskToDelete) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskToDelete.id));
    }
  };

  const handleToggleStatus = (taskToToggle) => {
    const newStatus = taskToToggle.status === 'completed' ? 'pending' : 'completed';
    setTasks(prev => prev.map(task =>
      task.id === taskToToggle.id 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          task.name.toLowerCase().includes(searchLower) ||
          (task.description && task.description.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  // Calculate task counts
  const taskCounts = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <p className="text-gray-600">
            Manage your tasks and track your progress efficiently.
          </p>
        </div>
        <button
          onClick={handleAddTask}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Task
        </button>
      </div>

      {/* Filters */}
      <TaskFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
        taskCounts={taskCounts}
      />

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
            </h3>
            <p className="text-gray-500 mb-4">
              {tasks.length === 0 
                ? 'Get started by creating your first task!' 
                : 'Try adjusting your search or filter criteria.'}
            </p>
            {tasks.length === 0 && (
              <button
                onClick={handleAddTask}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create First Task
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </p>
            </div>
            {filteredTasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </>
        )}
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

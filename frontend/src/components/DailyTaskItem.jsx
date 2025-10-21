import { useState } from 'react';
import { useDailyTaskContext } from '../hooks/useDailyTaskContext.js';
import Timer from './Timer.jsx';

export default function DailyTaskItem({ task, canMoveUp, canMoveDown }) {
  const { toggleDailyTaskCompletion, deleteDailyTask, moveTaskUp, moveTaskDown } = useDailyTaskContext();
  const [showTimer, setShowTimer] = useState(false);

  const handleToggle = () => {
    toggleDailyTaskCompletion(task.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this daily task?')) {
      deleteDailyTask(task.id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Health': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-800 dark:text-green-100 dark:border-green-700',
      'Learning': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700', 
      'Personal': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-800 dark:text-purple-100 dark:border-purple-700',
      'Work': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-800 dark:text-orange-100 dark:border-orange-700',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <div 
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
        task.isCompleted 
          ? 'bg-green-50 border-green-200 shadow-sm dark:bg-green-900 dark:border-green-700' 
          : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-500'
      }`}
      onClick={handleToggle}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Completion Checkbox */}
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.isCompleted 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-green-400 dark:border-gray-500 dark:hover:border-green-400'
          }`}>
            {task.isCompleted && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {/* Task Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className={`font-medium ${
                task.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
              }`}>
                {task.name}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{task.time}</span>
                {task.streak > 0 && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full dark:bg-orange-800 dark:text-orange-100">
                    🔥 {task.streak} day{task.streak !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
            
            {task.description && (
              <p className={`text-sm mb-2 ${
                task.isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded border ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {task.totalCompletions} time{task.totalCompletions !== 1 ? 's' : ''} completed
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                {/* Move Up Button */}
                {canMoveUp && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskUp(task.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-sm"
                    title="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                )}
                
                {/* Move Down Button */}
                {canMoveDown && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskDown(task.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-sm"
                    title="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
                
                {/* Timer Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTimer(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 transition-colors text-sm"
                  title="Start timer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                
                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors text-sm"
                  title="Delete task"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Timer Modal */}
      <Timer
        taskName={task.name}
        onClose={() => setShowTimer(false)}
        isVisible={showTimer}
      />
    </div>
  );
}

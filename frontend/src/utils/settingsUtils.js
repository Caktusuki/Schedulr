// Utility functions for settings management

export const defaultSettings = {
  // Appearance
  theme: 'light', // 'light', 'dark', 'system'
  
  // Task Management
  defaultPriority: 'medium',
  autoCompleteRecurring: false,
  showCompletedTasks: true,
  taskSortBy: 'deadline',
  
  // Notifications
  enableNotifications: true,
  reminderTime: 60, // minutes before deadline
  dailyDigest: true,
  dailyDigestTime: '09:00',
  
  // Calendar
  weekStartsOn: 'Monday', // 'Sunday', 'Monday'
  defaultView: 'month',
  showWeekends: true,
  
  // Data & Privacy
  autoSave: true,
  dataRetention: 365, // days
  
  // Advanced
  enableAnalytics: false,
  enableBetaFeatures: false,
  language: 'en'
};

export const loadSettingsFromStorage = () => {
  const savedSettings = localStorage.getItem('schedulr-settings');
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      return {};
    }
  }
  return {};
};

export const saveSettingsToStorage = (settings) => {
  localStorage.setItem('schedulr-settings', JSON.stringify(settings));
};

export const exportSettingsToFile = (settings) => {
  const dataStr = JSON.stringify(settings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'schedulr-settings.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importSettingsFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target.result);
        resolve(importedSettings);
      } catch (parseError) {
        reject(new Error(`Invalid settings file: ${parseError.message}`));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
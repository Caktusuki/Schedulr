import { useState, useRef } from 'react';
import { useSettings } from '../hooks/useSettings.js';
import { useTaskContext } from '../hooks/useTaskContext.js';

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings, exportSettings, importSettings } = useSettings();
  const { tasks, setTasks } = useTaskContext();
  const [activeSection, setActiveSection] = useState('appearance');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
 
  const handleSignOut = () => {
  localStorage.removeItem('authToken'); // or clear your own login state
  alert('Signed out successfully.');
  window.location.href = '/login'; // or whatever your login route is
};



  const fileInputRef = useRef(null);

  const sections = [
     { id: 'profile', name: 'Profile', icon: '👤' },
     { id: 'stats', name: 'Productivity Stats', icon: '📊' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'tasks', name: 'Task Management', icon: '📝' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'calendar', name: 'Calendar', icon: '📅' },
    { id: 'data', name: 'Data & Privacy', icon: '🔒' },
    { id: 'advanced', name: 'Advanced', icon: '⚙️' },
    { id: 'about', name: 'About', icon: 'ℹ️' }
  ];

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      importSettings(file)
        .then(() => {
          alert('Settings imported successfully!');
        })
        .catch((error) => {
          alert(`Failed to import settings: ${error.message}`);
        });
    }
  };

  const handleExportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'schedulr-tasks.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    setTasks([]);
    localStorage.removeItem('schedulr-tasks');
    setShowClearDataConfirm(false);
    alert('All task data has been cleared.');
  };

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
        <select
          value={settings.theme}
          onChange={(e) => updateSetting('theme', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base lg:text-md"
        >
          <option value="light">🌞 Light Mode</option>
          <option value="dark">🌙 Dark Mode</option>
          <option value="system">💻 System Default</option>
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose your preferred color theme</p>
      </div>
    </div>
  );

  const renderTaskSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Priority</label>
        <select
          value={settings.defaultPriority}
          onChange={(e) => updateSetting('defaultPriority', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base lg:text-md"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Default priority for new tasks</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Sort By</label>
        <select
          value={settings.taskSortBy}
          onChange={(e) => updateSetting('taskSortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base lg:text-md"
        >
          <option value="deadline">Deadline</option>
          <option value="priority">Priority</option>
          <option value="name">Name</option>
          <option value="created">Created Date</option>
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Default sorting method for task lists</p>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-complete recurring tasks</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Automatically mark recurring task instances as completed</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoCompleteRecurring}
            onChange={(e) => updateSetting('autoCompleteRecurring', e.target.checked)}
            className="sr-only peer text-sm"
          />
          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Show completed tasks</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Display completed tasks in task lists</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.showCompletedTasks}
            onChange={(e) => updateSetting('showCompletedTasks', e.target.checked)}
            className="sr-only peer text-sm"
          />
          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Enable notifications</p>
          <p className="text-xs text-gray-500">Receive notifications for task reminders</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enableNotifications}
            onChange={(e) => updateSetting('enableNotifications', e.target.checked)}
            className="sr-only peer text-sm"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {settings.enableNotifications && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Time</label>
            <select
              value={settings.reminderTime}
              onChange={(e) => updateSetting('reminderTime', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-sm sm:text-base lg:text-md"
            >
              <option value={15}>15 minutes before</option>
              <option value={30}>30 minutes before</option>
              <option value={60}>1 hour before</option>
              <option value={120}>2 hours before</option>
              <option value={1440}>1 day before</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">How early to remind you about tasks</p>
          </div>

          <div className="flex flex-wrap items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Daily digest</p>
              <p className="text-xs text-gray-500">Receive a daily summary of your tasks</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dailyDigest}
                onChange={(e) => updateSetting('dailyDigest', e.target.checked)}
                className="sr-only peer text-sm"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.dailyDigest && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Digest Time</label>
              <input
                type="time"
                value={settings.dailyDigestTime}
                onChange={(e) => updateSetting('dailyDigestTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">When to send your daily task digest</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderCalendarSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Week starts on</label>
        <select
          value={settings.weekStartsOn}
          onChange={(e) => updateSetting('weekStartsOn', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-sm sm:text-base lg:text-md"
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">First day of the week in calendar view</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Default calendar view</label>
        <select
          value={settings.defaultView}
          onChange={(e) => updateSetting('defaultView', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-sm sm:text-base lg:text-md"
        >
          <option value="month">Month View</option>
          <option value="week">Week View</option>
          <option value="agenda">Agenda View</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Default view when opening calendar</p>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Show weekends</p>
          <p className="text-xs text-gray-500">Display Saturday and Sunday in calendar</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.showWeekends}
            onChange={(e) => updateSetting('showWeekends', e.target.checked)}
            className="sr-only peer text-sm"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Auto-save</p>
          <p className="text-xs text-gray-500">Automatically save changes to local storage</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => updateSetting('autoSave', e.target.checked)}
            className="sr-only peer text-sm"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Data retention</label>
        <select
          value={settings.dataRetention}
          onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-sm sm:text-base lg:text-md"
        >
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
          <option value={180}>180 days</option>
          <option value={365}>1 year</option>
          <option value={-1}>Forever</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">How long to keep completed tasks</p>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Data Management</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={exportSettings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export Settings
          </button>
          
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImport}
              accept=".json"
              className="hidden text-sm"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Import Settings
            </button>
          </div>
          
          <button
            onClick={handleExportTasks}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Export Tasks
          </button>
          
          <button
            onClick={() => setShowClearDataConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          value={settings.language}
          onChange={(e) => updateSetting('language', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base lg:text-md"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Interface language (coming soon)</p>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Enable analytics</p>
          <p className="text-xs text-gray-500">Help improve Schedulr with anonymous usage data</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enableAnalytics}
            onChange={(e) => updateSetting('enableAnalytics', e.target.checked)}
            className="sr-only peer text-sm"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Enable beta features</p>
          <p className="text-xs text-gray-500">Access experimental features before they're released</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enableBetaFeatures}
            onChange={(e) => updateSetting('enableBetaFeatures', e.target.checked)}
            className="sr-only peer text-sm"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Reset Settings</h4>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reset All Settings
        </button>
        <p className="text-xs text-gray-500 mt-2">This will restore all settings to their default values</p>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Sign Out</h4>
        <button
          onClick={() => setShowSignOutConfirm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
        <p className="text-xs text-gray-500 mt-2">You will be signed out from your device.</p>
      </div>

    </div>
  );

    const renderStatsSettings = () => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const streak = Math.floor(completedTasks / 5); // Example rule: every 5 tasks = 1 streak day

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Your Productivity</h3>
      <div className="p-4 bg-blue-50 rounded-lg shadow">
        <p className="text-sm text-gray-600">Completed Tasks:</p>
        <p className="text-2xl font-bold text-blue-700">{completedTasks}</p>
      </div>

      <div className="p-4 bg-green-50 rounded-lg shadow">
        <p className="text-sm text-gray-600">Current Streak:</p>
        <p className="text-2xl font-bold text-green-700">{streak} days</p>
      </div>

      <p className="text-xs text-gray-500">
        (Example: Every 5 completed tasks count as 1 streak day. You can refine this logic.)
      </p>
    </div>
  );
};

  const renderProfileSettings = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">Profile</h3>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
      <input
        type="text"
        value={settings.profileName || ''}
        onChange={(e) => updateSetting('profileName', e.target.value)}
        placeholder="Enter your name"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
      <select
        value={settings.timeZone || 'UTC'}
        onChange={(e) => updateSetting('timeZone', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="UTC">UTC</option>
        <option value="IST">IST (India)</option>
        <option value="EST">EST (US)</option>
        <option value="PST">PST (US)</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => updateSetting('profilePicture', e.target.files?.[0]?.name)}
        className="w-full"
      />
      {settings.profilePicture && (
        <p className="text-xs text-gray-500 mt-1">Uploaded: {settings.profilePicture}</p>
      )}
    </div>
  </div>
);


const renderAboutSettings = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">About Schedulr</h3>
    <p className="text-gray-600">Schedulr helps you stay on top of tasks, calendar, and productivity.</p>

    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <p className="text-sm text-gray-700">Version: <span className="font-bold">1.0.0</span></p>
      <p className="text-sm text-gray-700">Build Date: <span className="font-bold">Oct 2025</span></p>
      <p className="text-sm text-gray-700">Developer: <span className="font-bold">XYZ</span></p>
    </div>

    <p className="text-xs text-gray-500">
      © {new Date().getFullYear()} Schedulr. All rights reserved.
    </p>
  </div>
);



  const renderActiveSection = () => {
    switch (activeSection) {
      case 'appearance': return renderAppearanceSettings();
      case 'tasks': return renderTaskSettings();
      case 'notifications': return renderNotificationSettings();
      case 'calendar': return renderCalendarSettings();
      case 'data': return renderDataSettings();
      case 'advanced': return renderAdvancedSettings();
      case 'stats': return renderStatsSettings();
      case 'profile': return renderProfileSettings();
      case 'about': return renderAboutSettings();
      default: return renderAppearanceSettings();
    }
  };

  return (
    <div className="mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl  font-bold text-gray-800 dark:text-gray-100 mb-2">Settings</h1>
        <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400">Customize your Schedulr experience</p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-8">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <div className=" bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-wrap text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                    activeSection === section.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-md sm:text-lg">{section.icon}</span>
                  <span className="text-sm sm:text-md md:text-lg font-medium">{section.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-md sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              {sections.find(s => s.id === activeSection)?.name}
            </h2>
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Reset All Settings</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6">
              This action will reset all settings to their default values. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  resetSettings();
                  setShowResetConfirm(false);
                  alert('Settings have been reset to defaults.');
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Settings
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Sign Out Confirmation Modal */}

      {showSignOutConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Sign Out</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Are you sure you want to sign out? You'll be logged out and redirected to login.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => {
                  handleSignOut();
                  setShowSignOutConfirm(false);
                }}
          className="flex-1 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
        >
          Sign Out
        </button>
        <button
          onClick={() => setShowSignOutConfirm(false)}
          className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
        >
          Cancel
          </button>
        </div>
      </div>
    </div>
  )}

      {/* Clear Data Confirmation Modal */}
      {showClearDataConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="ext-sm sm:text-md md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Clear All Data</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6">
              This action will permanently delete all your tasks and data. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClearAllData}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All Data
              </button>
              <button
                onClick={() => setShowClearDataConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

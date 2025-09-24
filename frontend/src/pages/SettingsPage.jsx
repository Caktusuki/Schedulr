import React, { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Palette,
  Calendar,
  Clock,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

const SettingsPage = () => {
  // State management for different settings sections
  const [settings, setSettings] = useState({
    // Profile Settings
    profile: {
      name: 'User',
      email: 'user@example.com',
      avatar: '',
      timezone: 'UTC+05:30'
    },
    // Appearance Settings
    appearance: {
      theme: 'system', // light, dark, system
      language: 'en',
      primaryColor: 'blue',
      fontSize: 'medium'
    },
    // Notification Settings
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      taskReminders: true,
      weeklyDigest: true,
      soundEnabled: true
    },
    // Calendar Settings
    calendar: {
      defaultView: 'month',
      startWeek: 'monday',
      workingHours: {
        start: '09:00',
        end: '17:00'
      },
      timeFormat: '12h'
    },
    // Privacy & Security
    privacy: {
      dataBackup: true,
      analytics: false,
      autoLogout: '30',
      twoFactorAuth: false
    }
  });

  const [activeSection, setActiveSection] = useState('profile');
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // saved, saving, error

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('schedulr_settings');
        if (savedSettings) {
          setSettings({ ...settings, ...JSON.parse(savedSettings) });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Save settings to localStorage
  const saveSettings = async () => {
    setSaveStatus('saving');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      localStorage.setItem('schedulr_settings', JSON.stringify(settings));
      setSaveStatus('saved');
      setIsDirty(false);
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Update specific setting
  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setIsDirty(true);
  };

  // Update nested setting (for working hours)
  const updateNestedSetting = (section, parentKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...prev[section][parentKey],
          [key]: value
        }
      }
    }));
    setIsDirty(true);
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'schedulr-settings.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import settings
  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings({ ...settings, ...importedSettings });
          setIsDirty(true);
        } catch (error) {
          alert('Invalid settings file');
        }
      };
      reader.readAsText(file);
    }
  };

  // Reset settings to defaults
  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      localStorage.removeItem('schedulr_settings');
      window.location.reload();
    }
  };

  // Settings sections configuration
  const sections = [
    {
      id: 'profile',
      title: 'Profile',
      icon: User,
      description: 'Manage your account information'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure your notification preferences'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: Calendar,
      description: 'Set your calendar preferences'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Manage your privacy and security settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Customize your Schedulr experience
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Save Status Indicator */}
              {saveStatus && (
                <div className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${saveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                    saveStatus === 'saving' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                  }`}>
                  {saveStatus === 'saved' && <Check size={16} className="mr-2" />}
                  {saveStatus === 'saving' && <RefreshCw size={16} className="mr-2 animate-spin" />}
                  {saveStatus === 'error' && <X size={16} className="mr-2" />}
                  {saveStatus === 'saved' && 'Settings Saved'}
                  {saveStatus === 'saving' && 'Saving...'}
                  {saveStatus === 'error' && 'Save Failed'}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={saveSettings}
                disabled={!isDirty || saveStatus === 'saving'}
                className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${isDirty && saveStatus !== 'saving'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-lg bg-white/80 border border-white/20 rounded-2xl shadow-xl p-6 sticky top-6">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 text-left ${activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <Icon size={20} className="mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{section.title}</div>
                        <div className={`text-xs truncate ${activeSection === section.id ? 'text-white/80' : 'text-gray-500'
                          }`}>
                          {section.description}
                        </div>
                      </div>
                      <ChevronRight size={16} className={`flex-shrink-0 transition-transform duration-200 ${activeSection === section.id ? 'rotate-90' : ''
                        }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={exportSettings}
                    className="w-full flex items-center p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download size={16} className="mr-2" />
                    Export Settings
                  </button>
                  <label className="w-full flex items-center p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    <Upload size={16} className="mr-2" />
                    Import Settings
                    <input
                      type="file"
                      accept=".json"
                      onChange={importSettings}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={resetSettings}
                    className="w-full flex items-center p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="backdrop-blur-lg bg-white/80 border border-white/20 rounded-2xl shadow-xl">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <User className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={settings.profile.name}
                          onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.profile.timezone}
                        onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="UTC-12:00">UTC-12:00 (Baker Island)</option>
                        <option value="UTC-08:00">UTC-08:00 (Pacific Time)</option>
                        <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
                        <option value="UTC+00:00">UTC+00:00 (London)</option>
                        <option value="UTC+05:30">UTC+05:30 (India)</option>
                        <option value="UTC+08:00">UTC+08:00 (Singapore)</option>
                        <option value="UTC+09:00">UTC+09:00 (Tokyo)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <Palette className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Appearance Settings</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Theme Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'light', label: 'Light', icon: Sun },
                          { value: 'dark', label: 'Dark', icon: Moon },
                          { value: 'system', label: 'System', icon: Globe }
                        ].map(({ value, label, icon: Icon }) => (
                          <button
                            key={value}
                            onClick={() => updateSetting('appearance', 'theme', value)}
                            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${settings.appearance.theme === value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            <Icon size={24} className="mb-2" />
                            <span className="text-sm font-medium">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.appearance.language}
                        onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                        <option value="ja">日本語</option>
                        <option value="hi">हिंदी</option>
                      </select>
                    </div>

                    {/* Primary Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Primary Color
                      </label>
                      <div className="flex space-x-3">
                        {[
                          { value: 'blue', color: 'bg-blue-500' },
                          { value: 'green', color: 'bg-green-500' },
                          { value: 'purple', color: 'bg-purple-500' },
                          { value: 'pink', color: 'bg-pink-500' },
                          { value: 'orange', color: 'bg-orange-500' }
                        ].map(({ value, color }) => (
                          <button
                            key={value}
                            onClick={() => updateSetting('appearance', 'primaryColor', value)}
                            className={`w-8 h-8 rounded-full ${color} border-2 transition-all duration-200 ${settings.appearance.primaryColor === value
                                ? 'border-gray-800 scale-110'
                                : 'border-gray-300 hover:scale-105'
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size
                      </label>
                      <div className="flex space-x-3">
                        {[
                          { value: 'small', label: 'Small' },
                          { value: 'medium', label: 'Medium' },
                          { value: 'large', label: 'Large' }
                        ].map(({ value, label }) => (
                          <button
                            key={value}
                            onClick={() => updateSetting('appearance', 'fontSize', value)}
                            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${settings.appearance.fontSize === value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400'
                              }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <Bell className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser push notifications' },
                      { key: 'taskReminders', label: 'Task Reminders', description: 'Get reminded about upcoming tasks' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Receive weekly summary of your tasks' },
                      { key: 'soundEnabled', label: 'Sound Notifications', description: 'Play sound for notifications' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900">{label}</div>
                          <div className="text-sm text-gray-500">{description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications[key]}
                            onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Calendar Settings */}
              {activeSection === 'calendar' && (
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Calendar Settings</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default View
                        </label>
                        <select
                          value={settings.calendar.defaultView}
                          onChange={(e) => updateSetting('calendar', 'defaultView', e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="month">Month View</option>
                          <option value="week">Week View</option>
                          <option value="day">Day View</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Week On
                        </label>
                        <select
                          value={settings.calendar.startWeek}
                          onChange={(e) => updateSetting('calendar', 'startWeek', e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="sunday">Sunday</option>
                          <option value="monday">Monday</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Format
                      </label>
                      <div className="flex space-x-3">
                        {[
                          { value: '12h', label: '12-hour (2:30 PM)' },
                          { value: '24h', label: '24-hour (14:30)' }
                        ].map(({ value, label }) => (
                          <button
                            key={value}
                            onClick={() => updateSetting('calendar', 'timeFormat', value)}
                            className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 ${settings.calendar.timeFormat === value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400'
                              }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Working Hours
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                          <input
                            type="time"
                            value={settings.calendar.workingHours.start}
                            onChange={(e) => updateNestedSetting('calendar', 'workingHours', 'start', e.target.value)}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">End Time</label>
                          <input
                            type="time"
                            value={settings.calendar.workingHours.end}
                            onChange={(e) => updateNestedSetting('calendar', 'workingHours', 'end', e.target.value)}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Security Settings */}
              {activeSection === 'privacy' && (
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <Shield className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      {[
                        { key: 'dataBackup', label: 'Automatic Data Backup', description: 'Automatically backup your data to cloud storage' },
                        { key: 'analytics', label: 'Usage Analytics', description: 'Help improve Schedulr by sharing anonymous usage data' },
                        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' }
                      ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <div className="font-medium text-gray-900">{label}</div>
                            <div className="text-sm text-gray-500">{description}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy[key]}
                              onChange={(e) => updateSetting('privacy', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auto Logout (minutes)
                      </label>
                      <select
                        value={settings.privacy.autoLogout}
                        onChange={(e) => updateSetting('privacy', 'autoLogout', e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="never">Never</option>
                      </select>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-semibold text-orange-800">Data Privacy</h3>
                          <p className="text-sm text-orange-700 mt-1">
                            Your data is stored locally in your browser and never sent to external servers unless you explicitly enable cloud backup.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

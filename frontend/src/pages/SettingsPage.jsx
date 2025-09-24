import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';

export default function SettingsPage() {
  const { currentTheme, themes, changeTheme, effectiveTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('appearance');

  const settingsSections = [
    {
      id: 'appearance',
      name: 'Appearance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      id: 'preferences',
      name: 'Preferences',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    }
  ];

  const getThemePreview = (themeName) => {
    if (themeName === 'system') {
      return (
        <div className="flex h-8 rounded overflow-hidden border border-theme-border">
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-gray-900"></div>
        </div>
      );
    }
    
    const isDark = themeName === 'dark';
    return (
      <div className={`h-8 rounded border ${isDark ? 'bg-slate-900 border-slate-600' : 'bg-white border-gray-200'}`}>
        <div className={`h-full w-full rounded flex items-center px-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
          <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Preview</div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-theme-textPrimary mb-2">Settings</h1>
        <p className="text-theme-textSecondary">Customize your Schedulr experience</p>
      </div>

      <div className="flex gap-8">
        {/* Settings Sidebar */}
        <div className="w-64">
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-textSecondary hover:bg-theme-secondary hover:text-theme-textPrimary'
                }`}
              >
                {section.icon}
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-theme-primary rounded-xl shadow-theme border border-theme-border p-6">
            {activeSection === 'appearance' && (
              <div>
                <h2 className="text-2xl font-semibold text-theme-textPrimary mb-6">Appearance</h2>
                
                {/* Theme Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-theme-textPrimary mb-4">Theme</h3>
                  <p className="text-theme-textSecondary mb-4">
                    Choose how Schedulr looks to you. Select a single theme, or sync with your system.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(themes).map(([key, theme]) => (
                      <button
                        key={key}
                        onClick={() => changeTheme(key)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          currentTheme === key
                            ? 'border-theme-accent bg-theme-secondary'
                            : 'border-theme-border hover:border-theme-accent hover:bg-theme-secondary'
                        }`}
                      >
                        <div className="mb-3">
                          {getThemePreview(key)}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-theme-textPrimary">{theme.displayName}</h4>
                            <p className="text-sm text-theme-textSecondary mt-1">
                              {key === 'light' && 'Clean and bright interface'}
                              {key === 'dark' && 'Easy on the eyes in low light'}
                              {key === 'system' && 'Matches your device preference'}
                            </p>
                          </div>
                          {currentTheme === key && (
                            <div className="ml-3">
                              <svg className="w-5 h-5 text-theme-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {currentTheme === 'system' && (
                    <div className="mt-4 p-4 bg-theme-secondary rounded-lg border border-theme-border">
                      <div className="flex items-center gap-2 text-theme-textSecondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">
                          Currently using <strong className="text-theme-textPrimary">{effectiveTheme}</strong> theme based on your system preference.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Accent Preview */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-theme-textPrimary mb-4">Color Scheme Preview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-theme-accent rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm text-theme-textSecondary">Accent</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-theme-success rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm text-theme-textSecondary">Success</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-theme-warning rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm text-theme-textSecondary">Warning</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-theme-error rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm text-theme-textSecondary">Error</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-2xl font-semibold text-theme-textPrimary mb-6">Notifications</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-theme-border">
                    <div>
                      <h3 className="font-medium text-theme-textPrimary">Task Reminders</h3>
                      <p className="text-sm text-theme-textSecondary">Get notified about upcoming deadlines</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-theme-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-b border-theme-border">
                    <div>
                      <h3 className="font-medium text-theme-textPrimary">Email Notifications</h3>
                      <p className="text-sm text-theme-textSecondary">Receive daily digest emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-theme-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-accent"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div>
                <h2 className="text-2xl font-semibold text-theme-textPrimary mb-6">Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                      Default Task Priority
                    </label>
                    <select className="w-full px-3 py-2 bg-theme-secondary border border-theme-border rounded-md text-theme-textPrimary focus:outline-none focus:ring-2 focus:ring-theme-accent">
                      <option value="low">Low</option>
                      <option value="medium" selected>Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-theme-textPrimary mb-2">
                      Week Starts On
                    </label>
                    <select className="w-full px-3 py-2 bg-theme-secondary border border-theme-border rounded-md text-theme-textPrimary focus:outline-none focus:ring-2 focus:ring-theme-accent">
                      <option value="sunday" selected>Sunday</option>
                      <option value="monday">Monday</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

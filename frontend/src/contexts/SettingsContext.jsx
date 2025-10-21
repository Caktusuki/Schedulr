import { useState, useEffect } from 'react';
import { SettingsContext } from './settingsContext.js';
import { 
  defaultSettings,
  loadSettingsFromStorage,
  saveSettingsToStorage
} from '../utils/settingsUtils.js';

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    // Initialize with saved settings immediately
    const savedSettings = loadSettingsFromStorage();
    return Object.keys(savedSettings).length > 0 
      ? { ...defaultSettings, ...savedSettings }
      : defaultSettings;
  });

  // Apply theme to document root immediately and whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    const theme = settings.theme;

    const applyTheme = () => {
      // Remove dark class first
      root.classList.remove('dark');

      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        // Already removed above
      } else if (theme === 'system') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        }
      }
    };

    applyTheme();

    // Listen for system theme changes when using 'system' mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme]);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    saveSettingsToStorage(settings);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateMultipleSettings = (updates) => {
    setSettings(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetSettings = () => {
    localStorage.removeItem('schedulr-settings');
    setSettings(defaultSettings);
  };

  const contextValue = {
    settings,
    updateSetting,
    updateMultipleSettings,
    resetSettings,
    setSettings
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
import { useState, useEffect } from 'react';
import { SettingsContext } from './settingsContext.js';
import { 
  defaultSettings,
  loadSettingsFromStorage,
  saveSettingsToStorage
} from '../utils/settingsUtils.js';

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = loadSettingsFromStorage();
    if (Object.keys(savedSettings).length > 0) {
      setSettings(prev => ({ ...prev, ...savedSettings }));
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    const theme = settings.theme;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else if (theme === 'system') {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
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
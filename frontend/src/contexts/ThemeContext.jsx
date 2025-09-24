/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'light',
    displayName: 'Light Mode',
    colors: {
      // Background colors
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      
      // Text colors
      textPrimary: '#1e293b',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      
      // Border colors
      border: '#e2e8f0',
      borderLight: '#f1f5f9',
      
      // Accent colors
      accent: '#3b82f6',
      accentHover: '#2563eb',
      
      // Status colors
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      
      // Priority colors
      priorityLow: '#10b981',
      priorityMedium: '#f59e0b',
      priorityHigh: '#ef4444',
      
      // Shadow
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    }
  },
  dark: {
    name: 'dark',
    displayName: 'Dark Mode',
    colors: {
      // Background colors
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      
      // Text colors
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      
      // Border colors
      border: '#334155',
      borderLight: '#475569',
      
      // Accent colors
      accent: '#3b82f6',
      accentHover: '#60a5fa',
      
      // Status colors
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      
      // Priority colors
      priorityLow: '#10b981',
      priorityMedium: '#f59e0b',
      priorityHigh: '#ef4444',
      
      // Shadow
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    }
  },
  system: {
    name: 'system',
    displayName: 'System Default',
    colors: null // Will use system preference
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('system');
  const [effectiveTheme, setEffectiveTheme] = useState('light');

  // Get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('schedulr-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Update effective theme when current theme or system preference changes
  useEffect(() => {
    let newEffectiveTheme;
    
    if (currentTheme === 'system') {
      newEffectiveTheme = getSystemTheme();
    } else {
      newEffectiveTheme = currentTheme;
    }
    
    setEffectiveTheme(newEffectiveTheme);
    
    // Apply theme to document
    applyTheme(newEffectiveTheme);
    
    // Listen for system theme changes when using system theme
    if (currentTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        setEffectiveTheme(systemTheme);
        applyTheme(systemTheme);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [currentTheme]);

  // Apply theme colors to CSS custom properties
  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    if (!theme || !theme.colors) return;

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${themeName}`);
  };

  // Change theme and save to localStorage
  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setCurrentTheme(newTheme);
      localStorage.setItem('schedulr-theme', newTheme);
    }
  };

  // Get next theme in cycle (for quick toggle)
  const toggleTheme = () => {
    const themeOrder = ['light', 'dark', 'system'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    changeTheme(nextTheme);
  };

  const value = {
    currentTheme,
    effectiveTheme,
    themes,
    changeTheme,
    toggleTheme,
    themeColors: themes[effectiveTheme]?.colors || themes.light.colors
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
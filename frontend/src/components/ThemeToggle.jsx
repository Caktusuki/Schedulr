import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { currentTheme, themes, changeTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickToggle = () => {
    toggleTheme();
  };

  const handleThemeSelect = (themeName) => {
    changeTheme(themeName);
    setIsOpen(false);
  };

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'light':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Quick Toggle Button */}
      <button
        onClick={handleQuickToggle}
        className="p-2 rounded-lg transition-colors duration-200 bg-theme-secondary hover:bg-theme-tertiary text-theme-textPrimary border border-theme-border"
        title={`Current theme: ${themes[currentTheme]?.displayName}`}
        aria-label="Toggle theme"
      >
        {getThemeIcon(currentTheme)}
      </button>

      {/* Dropdown Menu (for future expansion) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-theme-primary border border-theme-border rounded-lg shadow-lg py-1 z-50">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => handleThemeSelect(key)}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 transition-colors duration-150 text-theme-textPrimary hover:bg-theme-secondary ${
                currentTheme === key ? 'bg-theme-tertiary' : ''
              }`}
            >
              {getThemeIcon(key)}
              <span>{theme.displayName}</span>
              {currentTheme === key && (
                <svg className="w-4 h-4 ml-auto text-theme-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Alternative compact version for mobile
export function ThemeToggleCompact() {
  const { toggleTheme, currentTheme, themes } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-full transition-all duration-200 bg-theme-secondary hover:bg-theme-tertiary text-theme-textSecondary hover:text-theme-textPrimary"
      title={`Switch from ${themes[currentTheme]?.displayName}`}
      aria-label="Toggle theme"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {currentTheme === 'dark' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        )}
      </svg>
    </button>
  );
}
import { useContext } from 'react';
import { SettingsContext } from '../contexts/settingsContext.js';
import { 
  exportSettingsToFile,
  importSettingsFromFile
} from '../utils/settingsUtils.js';

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  // Create helper functions that use the settings from context
  const contextWithHelpers = {
    ...context,
    exportSettings: () => exportSettingsToFile(context.settings),
    importSettings: (file) => {
      return importSettingsFromFile(file).then(importedSettings => {
        context.setSettings(prev => ({ ...prev, ...importedSettings }));
        return importedSettings;
      });
    }
  };
  
  return contextWithHelpers;
};
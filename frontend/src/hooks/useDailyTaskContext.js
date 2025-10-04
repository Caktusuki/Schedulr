import { useContext } from 'react';
import { DailyTaskContext } from '../contexts/dailyTaskContext.js';

export const useDailyTaskContext = () => {
  const context = useContext(DailyTaskContext);
  if (!context) {
    throw new Error('useDailyTaskContext must be used within a DailyTaskProvider');
  }
  return context;
};
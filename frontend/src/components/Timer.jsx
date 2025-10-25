import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export default function Timer({ taskName, onClose, isVisible }) {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [session, setSession] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const modes = useMemo(() => ({
    work: { duration: 25 * 60, label: 'Work Time', color: 'bg-red-500' },
    shortBreak: { duration: 5 * 60, label: 'Short Break', color: 'bg-green-500' },
    longBreak: { duration: 15 * 60, label: 'Long Break', color: 'bg-blue-500' }
  }), []);

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    setTime(modes[newMode].duration);
  }, [modes]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    // Show browser notification
    if (Notification.permission === 'granted') {
      new Notification(`${modes[mode].label} Complete!`, {
        body: mode === 'work' ? 'Time for a break!' : 'Ready to get back to work?',
        icon: '/favicon.svg'
      });
    }

    // Auto-switch modes
    if (mode === 'work') {
      setTotalSessions(prev => prev + 1);
      const newMode = session % 4 === 0 ? 'longBreak' : 'shortBreak';
      switchMode(newMode);
      setSession(prev => prev + 1);
    } else {
      switchMode('work');
    }
  }, [mode, modes, session, switchMode]);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time, handleTimerComplete]);

  const toggleTimer = () => {
    if (!isRunning && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(modes[mode].duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode].duration - time) / modes[mode].duration) * 100;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pomodoro Timer</h3>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Task Name */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">Working on:</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">{taskName}</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {Object.entries(modes).map(([key, modeInfo]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                mode === key
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {modeInfo.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="relative w-48 h-48 mx-auto">
            {/* Progress Circle */}
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                className={`transition-all duration-300 ${modes[mode].color.replace('bg-', 'text-')}`}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {formatTime(time)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                {modes[mode].label}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isRunning
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-3 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Session Counter */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          <p>Session {session} • Total completed: {totalSessions}</p>
        </div>

        {/* Hidden audio element for notifications */}
        <audio
          ref={audioRef}
          preload="auto"
          className="hidden"
        >
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+T0vWscATO95+2zZisEIOT0vWsaATO95+2zZisEIOT0vWsaATLAtAA=" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
}

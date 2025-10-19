import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const register = (email, password) => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In a real app, this should be hashed
      createdAt: new Date().toISOString()
    };

    // Save user to users array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Set as current user
    setUser({ id: newUser.id, email: newUser.email });

    return newUser;
  };

  const login = (email, password) => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Set as current user (without password)
    setUser({ id: foundUser.id, email: foundUser.email });

    return foundUser;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

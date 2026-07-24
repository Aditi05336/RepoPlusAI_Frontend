import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnalysisData } from '../types/repository';
import { analyzeRepository, checkBackendHealth } from '../api/analyzeRepository';
import { User, logoutUser, getCurrentUser } from '../api/auth';

interface RecentSearch {
  owner: string;
  repo: string;
  score: number;
  timestamp: number;
}

interface AnalysisContextType {
  data: AnalysisData | null;
  loading: boolean;
  error: string | null;
  isBackendConnected: boolean;
  recentSearches: RecentSearch[];
  user: User | null;
  token: string | null;
  isMockSignedIn: boolean;
  setIsMockSignedIn: (val: boolean) => void;
  setAuthSession: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  logout: () => Promise<void>;
  performAnalysis: (owner: string, repo: string) => Promise<void>;
  clearAnalysis: () => void;
  removeRecentSearch: (owner: string, repo: string) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(true);
  
  // Auth state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('repopulse_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('repopulse_token');
    } catch {
      return null;
    }
  });

  const isMockSignedIn = Boolean(user || token);

  const setIsMockSignedIn = (val: boolean) => {
    if (!val) {
      logout();
    }
  };

  const setAuthSession = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    try {
      localStorage.setItem('repopulse_user', JSON.stringify(newUser));
      localStorage.setItem('repopulse_token', newToken);
    } catch {}
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    try {
      localStorage.setItem('repopulse_user', JSON.stringify(updatedUser));
    } catch {}
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('repopulse_user');
      localStorage.removeItem('repopulse_token');
      await logoutUser();
    } catch {}
  };

  useEffect(() => {
    if (token) {
      getCurrentUser(token).then((res) => {
        if (res.success && res.user) {
          setUser(res.user);
          try {
            localStorage.setItem('repopulse_user', JSON.stringify(res.user));
          } catch {}
        }
      });
    }
  }, [token]);

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    try {
      const saved = localStorage.getItem('repopulse_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    checkBackendHealth().then(setIsBackendConnected);
    const interval = setInterval(() => {
      checkBackendHealth().then(setIsBackendConnected);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const performAnalysis = async (owner: string, repo: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeRepository(owner, repo);
      if (result.success && result.data) {
        setData(result.data);
        setIsBackendConnected(true);

        // Update recent searches
        const newEntry: RecentSearch = {
          owner,
          repo,
          score: result.data.scores.overall_health,
          timestamp: Date.now(),
        };

        setRecentSearches((prev) => {
          const filtered = prev.filter(
            (item) => !(item.owner.toLowerCase() === owner.toLowerCase() && item.repo.toLowerCase() === repo.toLowerCase())
          );
          const updated = [newEntry, ...filtered].slice(0, 6);
          try {
            localStorage.setItem('repopulse_recent_searches', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      } else {
        setError(result.error || 'Failed to analyze repository');
      }
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Error connecting to backend server';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const clearAnalysis = () => {
    setData(null);
    setError(null);
  };

  const removeRecentSearch = (owner: string, repo: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter(
        (item) => !(item.owner.toLowerCase() === owner.toLowerCase() && item.repo.toLowerCase() === repo.toLowerCase())
      );
      try {
        localStorage.setItem('repopulse_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <AnalysisContext.Provider
      value={{
        data,
        loading,
        error,
        isBackendConnected,
        recentSearches,
        user,
        token,
        isMockSignedIn,
        setIsMockSignedIn,
        setAuthSession,
        updateUser,
        logout,
        performAnalysis,
        clearAnalysis,
        removeRecentSearch,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

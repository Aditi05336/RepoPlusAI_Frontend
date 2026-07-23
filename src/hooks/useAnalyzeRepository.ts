import { useAnalysis } from '../context/AnalysisContext';

export function useAnalyzeRepository() {
  const { data, loading, error, isBackendConnected, recentSearches, performAnalysis, clearAnalysis, removeRecentSearch } = useAnalysis();

  return {
    data,
    loading,
    error,
    isBackendConnected,
    recentSearches,
    analyze: performAnalysis,
    reset: clearAnalysis,
    removeRecent: removeRecentSearch,
  };
}

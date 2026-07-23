import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalyzeRepository } from '../hooks/useAnalyzeRepository';
import { RepoSearchForm } from '../components/search/RepoSearchForm';
import { RecentSearches } from '../components/search/RecentSearches';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, recentSearches, analyze, removeRecent } = useAnalyzeRepository();

  const handleSearch = async (owner: string, repo: string) => {
    await analyze(owner, repo);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 animate-fade-in">
      {/* Top Search Hero */}
      <div className="mb-12 text-center">
        <RepoSearchForm onSearch={handleSearch} loading={loading} />
        <RecentSearches searches={recentSearches} onSelect={handleSearch} onRemove={removeRecent} />
      </div>

      {/* Main Content Area */}
      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={() => {}} />}
      {!loading && !error && <EmptyState onSelectPreset={handleSearch} />}
    </div>
  );
};

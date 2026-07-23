import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalyzeRepository } from '../hooks/useAnalyzeRepository';
import { RepositoryOverviewCard } from '../components/dashboard/RepositoryOverviewCard';
import { OverallHealthCard } from '../components/dashboard/OverallHealthCard';
import { ForecastCard } from '../components/dashboard/ForecastCard';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { HealthSummaryChart } from '../components/charts/HealthSummaryChart';
import { CommitTrendChart } from '../components/charts/CommitTrendChart';
import { ContributorBarChart } from '../components/charts/ContributorBarChart';
import { LanguagePieChart } from '../components/charts/LanguagePieChart';
import { RepoSearchForm } from '../components/search/RepoSearchForm';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, analyze } = useAnalyzeRepository();

  const handleSearch = (owner: string, repo: string) => {
    analyze(owner, repo);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <ErrorState message={error} onRetry={() => navigate('/')} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16 py-16 text-center">
        <h3 className="text-xl font-bold text-[#12172A] mb-4">No Active Repository Selected</h3>
        <p className="text-[#3E4258] mb-6">Please search for a repository to view its health dashboard.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C2541] hover:bg-[#141B30] text-white font-bold text-sm shadow-md shadow-[#1C2541]/20 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Go to Search
        </button>
      </div>
    );
  }

  const { repository, scores, forecast, contributors, languages, ai_insights } = data;

  return (
    <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16 py-8 space-y-8 animate-fade-in">
      {/* Top Search Bar & Return button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/80 border border-[#E2D9CD] text-xs font-semibold text-[#12172A] hover:border-[#1C2541]/40 transition-all shadow-xs shrink-0"
        >
          <ArrowLeft className="h-4 w-4 text-[#1C2541]" /> Back to Search
        </button>

        <div className="w-full md:w-auto flex-1 max-w-lg">
          <RepoSearchForm onSearch={handleSearch} loading={loading} initialValue={repository.full_name} />
        </div>

      </div>

      {/* 1. Repository Metadata Overview */}
      <RepositoryOverviewCard repo={repository} />

      {/* 2. Key Metrics Row: Overall Health + ML Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OverallHealthCard scores={scores} />
        <ForecastCard forecast={forecast} />
      </div>

      {/* 3. AI Insights Executive Summary Card */}
      <AIInsightCard insights={ai_insights} />

      {/* 4. Interactive Recharts Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#12172A] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#8A6C2E]" />
            Interactive Analytics & Data Visualization
          </h2>
        </div>

        {/* 52-Week Commit History Trend Line Chart */}
        <CommitTrendChart forecast={forecast} />

        {/* Grid of 3 Charts: Radar Health + Contributors + Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          <HealthSummaryChart scores={scores} />
          <ContributorBarChart contributors={contributors} busFactor={scores.bus_factor} />
          <LanguagePieChart languages={languages} />
        </div>
      </div>
    </div>
  );
};

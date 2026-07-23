import React, { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { parseGitHubInput } from '../../utils/formatters';

interface RepoSearchFormProps {
  onSearch: (owner: string, repo: string) => void;
  loading: boolean;
  initialValue?: string;
}

export const RepoSearchForm: React.FC<RepoSearchFormProps> = ({ onSearch, loading, initialValue = '' }) => {
  const [inputVal, setInputVal] = useState(initialValue);

  useEffect(() => {
    setInputVal(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim() || initialValue || 'facebook/react';
    if (!inputVal.trim()) {
      setInputVal(raw);
    }

    const parsed = parseGitHubInput(raw);
    if (parsed && parsed.owner && parsed.repo) {
      onSearch(parsed.owner, parsed.repo);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-4 text-[#3E4258]/60">
            <Search className="h-5 w-5" />
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter repository as 'owner/repo' (e.g. facebook/react)"
            disabled={loading}
            className="w-full h-12 sm:h-14 pl-12 pr-4 sm:pr-36 py-3 leading-normal caret-[#1C2541] rounded-xl sm:rounded-2xl border border-[#E2D9CD] bg-white text-[#12172A] placeholder-[#3E4258]/60 shadow-xs focus:border-[#1C2541] focus:outline-none focus:ring-2 focus:ring-[#1C2541]/20 text-xs sm:text-sm md:text-base font-medium transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="hidden sm:flex absolute right-2 h-10 px-5 rounded-xl bg-[#1C2541] hover:bg-[#141B30] text-white font-semibold text-xs md:text-sm shadow-md shadow-[#1C2541]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all items-center gap-1.5 whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#8A6C2E]" />
                Analyze Repo
              </span>
            )}
          </button>
        </div>

        {/* Mobile-only full-width action button */}
        <button
          type="submit"
          disabled={loading}
          className="flex sm:hidden h-12 w-full rounded-xl bg-[#1C2541] hover:bg-[#141B30] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#1C2541]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all items-center justify-center gap-1.5"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#8A6C2E]" />
              Analyze Repo
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

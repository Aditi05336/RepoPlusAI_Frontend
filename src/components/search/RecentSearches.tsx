import React from 'react';
import { History, X } from 'lucide-react';
import { getScoreColor } from '../../utils/formatters';

interface RecentSearchesProps {
  searches: Array<{ owner: string; repo: string; score: number }>;
  onSelect: (owner: string, repo: string) => void;
  onRemove?: (owner: string, repo: string) => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSelect, onRemove }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <span className="text-xs text-[#3E4258] flex items-center gap-1 font-medium mr-1">
        <History className="h-3.5 w-3.5 text-[#1C2541]" /> Recent:
      </span>
      {searches.map((item) => {
        const colors = getScoreColor(item.score);
        return (
          <div
            key={`${item.owner}/${item.repo}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-[#E2D9CD] hover:border-[#1C2541]/50 transition-all text-xs font-mono text-[#12172A] shadow-xs group"
          >
            <button
              type="button"
              onClick={() => onSelect(item.owner, item.repo)}
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              title={`Analyze ${item.owner}/${item.repo}`}
            >
              <span>{item.owner}/{item.repo}</span>
              <span className={`text-[10px] font-bold ${colors.text}`}>{item.score}</span>
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.owner, item.repo);
                }}
                className="p-0.5 rounded-full text-[#3E4258]/60 hover:text-red-600 hover:bg-red-50 transition-colors ml-0.5"
                title={`Remove ${item.owner}/${item.repo} from recents`}
                aria-label={`Remove ${item.owner}/${item.repo} from recents`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

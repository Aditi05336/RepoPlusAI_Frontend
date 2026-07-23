import React from 'react';
import { RepositoryOverview } from '../../types/repository';
import { Card } from '../common/Card';
import { Star, GitFork, Eye, AlertCircle, Scale, ExternalLink, Calendar } from 'lucide-react';
import { formatNumber, formatDate } from '../../utils/formatters';

interface RepositoryOverviewCardProps {
  repo: RepositoryOverview;
}

export const RepositoryOverviewCard: React.FC<RepositoryOverviewCardProps> = ({ repo }) => {
  return (
    <Card gradient className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E2D9CD]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#12172A] tracking-tight">
              {repo.full_name}
            </h1>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#1C2541] hover:text-[#8A6C2E] transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="text-[#3E4258] text-sm max-w-3xl leading-relaxed">
            {repo.description || 'No description provided for this repository.'}
          </p>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E2D9CD] text-[#12172A] text-xs font-mono">
            Branch: {repo.default_branch}
          </span>
          {repo.license && (
            <span className="px-3 py-1 rounded-full bg-[#1C2541]/10 border border-[#1C2541]/30 text-[#1C2541] text-xs font-mono flex items-center gap-1">
              <Scale className="h-3 w-3" />
              {repo.license}
            </span>
          )}
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-[#E2D9CD]">
          <div className="p-2.5 rounded-lg bg-[#8A6C2E]/10 text-[#8A6C2E] border border-[#8A6C2E]/20">
            <Star className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-[#3E4258] font-medium">Stars</div>
            <div className="text-lg font-extrabold text-[#12172A] font-mono">{formatNumber(repo.stars)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-[#E2D9CD]">
          <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
            <GitFork className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-[#3E4258] font-medium">Forks</div>
            <div className="text-lg font-extrabold text-[#12172A] font-mono">{formatNumber(repo.forks)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-[#E2D9CD]">
          <div className="p-2.5 rounded-lg bg-[#059669]/10 text-[#059669] border border-[#059669]/20">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-[#3E4258] font-medium">Watchers</div>
            <div className="text-lg font-extrabold text-[#12172A] font-mono">{formatNumber(repo.watchers)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-[#E2D9CD]">
          <div className="p-2.5 rounded-lg bg-[#B94A48]/10 text-[#B94A48] border border-[#B94A48]/20">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-[#3E4258] font-medium">Open Issues</div>
            <div className="text-lg font-extrabold text-[#12172A] font-mono">{formatNumber(repo.open_issues_count)}</div>
          </div>
        </div>
      </div>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-4">
          <span className="text-xs text-[#3E4258]/70 font-medium mr-1">Topics:</span>
          {repo.topics.slice(0, 8).map((topic) => (
            <span key={topic} className="px-2.5 py-0.5 rounded-md bg-white border border-[#E2D9CD] text-[#3E4258] text-xs font-mono">
              #{topic}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

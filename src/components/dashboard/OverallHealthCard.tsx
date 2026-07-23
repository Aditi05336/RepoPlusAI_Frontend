import React from 'react';
import { CategoryScores } from '../../types/repository';
import { Card } from '../common/Card';
import { getScoreColor } from '../../utils/formatters';
import { ShieldCheck, Activity, Users, FileText, Tag, Code2, HeartPulse } from 'lucide-react';

interface OverallHealthCardProps {
  scores: CategoryScores;
}

export const OverallHealthCard: React.FC<OverallHealthCardProps> = ({ scores }) => {
  const overallColors = getScoreColor(scores.overall_health);

  const scoreItems = [
    { label: 'Activity Score', val: scores.activity_score, icon: Activity, weight: '30%' },
    { label: 'Issue Resolution', val: scores.issue_score, icon: ShieldCheck, weight: '20%' },
    { label: 'Contributor Diversity', val: scores.contributor_score, icon: Users, weight: '20%' },
    { label: 'Documentation Quality', val: scores.documentation_score, icon: FileText, weight: '15%' },
    { label: 'Release Recency', val: scores.release_score, icon: Tag, weight: '15%' },
    { label: 'Commit Quality', val: scores.commit_quality_score, icon: Code2, weight: 'Bonus' },
  ];

  const getBarFillColor = (score: number) => {
    if (score >= 75) return 'bg-[#059669]';
    if (score >= 50) return 'bg-[#D97706]';
    return 'bg-[#B94A48]';
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#E2D9CD] mb-6">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-[#1C2541]" />
            <h3 className="text-lg font-bold text-[#12172A]">Overall Health Score</h3>
          </div>
          <span className="text-xs text-[#3E4258] font-mono">Weighted Formula</span>
        </div>

        {/* Big Health Meter Display */}
        <div className="flex items-center justify-center py-4 mb-6">
          <div className="relative flex items-center justify-center">
            {/* Background ring */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="10"
                className="text-[#E2D9CD]"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * scores.overall_health) / 100}
                strokeLinecap="round"
                className={`${overallColors.text} transition-all duration-1000 ease-out`}
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-extrabold font-mono ${overallColors.text}`}>
                {scores.overall_health}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#3E4258]/70 mt-0.5">
                OUT OF 100
              </span>
            </div>
          </div>
        </div>

        {/* Score Category Breakdown Progress Bars */}
        <div className="space-y-3">
          {scoreItems.map((item) => {
            const itemColors = getScoreColor(item.val);
            const Icon = item.icon;
            return (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#12172A] font-medium">
                    <Icon className="h-3.5 w-3.5 text-[#3E4258]" />
                    {item.label}
                    <span className="text-[10px] text-[#3E4258]/60 font-mono">({item.weight})</span>
                  </span>
                  <span className={`font-mono font-bold ${itemColors.text}`}>{item.val}/100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 border border-[#E2D9CD]/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getBarFillColor(item.val)} transition-all duration-500`}
                    style={{ width: `${Math.min(100, Math.max(0, item.val))}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

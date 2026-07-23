import React from 'react';
import { CommitForecast } from '../../types/repository';
import { Card } from '../common/Card';
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';

interface ForecastCardProps {
  forecast: CommitForecast;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return {
          label: 'Increasing Activity',
          colors: 'bg-emerald-50 text-[#059669] border-emerald-200',
          icon: TrendingUp,
        };
      case 'declining':
        return {
          label: 'Declining Activity',
          colors: 'bg-rose-50 text-[#B94A48] border-rose-200',
          icon: TrendingDown,
        };
      case 'stable':
        return {
          label: 'Stable Velocity',
          colors: 'bg-amber-50 text-[#C28A2C] border-amber-200',
          icon: Minus,
        };
      default:
        return {
          label: 'Insufficient Data',
          colors: 'bg-slate-100 text-[#3E4258] border-[#E2D9CD]',
          icon: Minus,
        };
    }
  };

  const badge = getTrendBadge(forecast.trend);
  const Icon = badge.icon;

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#E2D9CD] mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#8A6C2E]" />
            <h3 className="text-lg font-bold text-[#12172A]">ML Commit Activity Forecast</h3>
          </div>
          <span className="text-xs text-[#8A6C2E] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-mono">
            {forecast.method === 'linear_regression' ? 'Scikit-Learn Model' : 'Moving Average'}
          </span>
        </div>

        <div className="space-y-6">
          {/* Main Prediction Highlight */}
          <div className="p-4 rounded-xl bg-white/80 border border-[#E2D9CD] flex items-center justify-between">
            <div>
              <div className="text-xs text-[#3E4258] font-medium mb-1">Predicted Commits Next Week</div>
              <div className="text-3xl font-extrabold text-[#12172A] font-mono">
                ~{forecast.predicted_next_week_commits}
                <span className="text-xs text-[#3E4258]/70 font-sans ml-1">commits</span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${badge.colors}`}>
              <Icon className="h-4 w-4" />
              {badge.label}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1C2541]/5 border border-[#1C2541]/20 text-xs text-[#3E4258] leading-relaxed flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-[#8A6C2E] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#12172A]">How it works: </span>
              Our machine learning pipeline extracts historical weekly commit buckets, computes Ordinary Least Squares linear regression slope, and projects activity trajectory.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

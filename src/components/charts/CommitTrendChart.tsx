import React from 'react';
import { CommitForecast } from '../../types/repository';
import { Card } from '../common/Card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { LineChart, Sparkles } from 'lucide-react';

interface CommitTrendChartProps {
  forecast: CommitForecast;
}

export const CommitTrendChart: React.FC<CommitTrendChartProps> = ({ forecast }) => {
  const history = forecast?.weekly_commit_history || [];
  const predicted = forecast?.predicted_next_week_commits ?? 0;

  // Format data for chart, append projected point if history exists
  const chartData = history.map((item) => ({
    week: item.week_start ? item.week_start.slice(5) : 'Week',
    commits: item.commit_count ?? 0,
    type: 'Historical',
  }));

  if (chartData.length > 0 && predicted > 0) {
    chartData.push({
      week: 'Forecast',
      commits: predicted,
      type: 'Predicted ML Point',
    });
  }


  return (
    <Card className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E2D9CD] mb-6">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-[#1C2541]" />
          <h3 className="text-lg font-bold text-[#12172A]">52-Week Commit Velocity & ML Trend</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-[#1C2541]">
            <span className="h-2 w-2 rounded-full bg-[#1C2541]"></span> Historical Velocity
          </span>
          <span className="flex items-center gap-1.5 text-[#8A6C2E]">
            <Sparkles className="h-3 w-3" /> ML Projected
          </span>
        </div>
      </div>

      <div className="h-72 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8A6C2E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1C2541" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2D9CD" />
              <XAxis dataKey="week" stroke="#3E4258" tick={{ fill: '#3E4258', fontSize: 11 }} />
              <YAxis stroke="#3E4258" tick={{ fill: '#3E4258', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2D9CD', borderRadius: '12px', color: '#12172A', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                itemStyle={{ color: '#1C2541' }}
                formatter={(value: any) => [`${value} commits`, 'Weekly Activity']}
              />
              <Area
                type="monotone"
                dataKey="commits"
                stroke="#1C2541"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCommits)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-[#3E4258]/60 text-sm">
            No historical commit weekly buckets available.
          </div>
        )}
      </div>
    </Card>
  );
};

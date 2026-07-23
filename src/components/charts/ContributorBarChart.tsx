import React from 'react';
import { Contributor } from '../../types/repository';
import { Card } from '../common/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Users, AlertTriangle } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface ContributorBarChartProps {
  contributors: Contributor[];
  busFactor: number;
}

export const ContributorBarChart: React.FC<ContributorBarChartProps> = ({ contributors, busFactor }) => {
  const topContributors = (contributors || []).slice(0, 10);
  const safeBusFactor = busFactor ?? 1;

  const barColors = ['#1C2541', '#8A6C2E', '#C9A15E', '#059669', '#3E4258'];

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#E2D9CD] mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#1C2541]" />
            <h3 className="text-lg font-bold text-[#12172A]">Top Contributor Distribution</h3>
          </div>
          <span className="text-xs text-[#3E4258]/70 font-mono">Top {topContributors.length} Authors</span>
        </div>

        {/* Bus Factor Risk Alert Banner */}
        <div className={`p-3 rounded-xl mb-4 border flex items-center justify-between text-xs ${
          safeBusFactor <= 2
            ? 'bg-rose-50 border-rose-200 text-[#B94A48]'
            : 'bg-emerald-50 border-emerald-200 text-[#059669]'
        }`}>
          <span className="flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Bus Factor (Minimum key contributors for 50%+ work):
          </span>
          <span className="font-extrabold font-mono text-sm px-2 py-0.5 rounded bg-white border border-[#E2D9CD] text-[#12172A] shadow-xs">
            {safeBusFactor} {safeBusFactor === 1 ? 'Person' : 'People'}
          </span>
        </div>

        <div className="h-56 w-full">
          {topContributors.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topContributors} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2D9CD" />
                <XAxis
                  dataKey="login"
                  stroke="#3E4258"
                  tick={{ fill: '#3E4258', fontSize: 10 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis stroke="#3E4258" tick={{ fill: '#3E4258', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2D9CD', borderRadius: '12px', color: '#12172A', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(value: any) => [`${formatNumber(value)} commits`, 'Contributions']}
                />
                <Bar dataKey="contributions" radius={[6, 6, 0, 0]}>
                  {topContributors.map((_, index) => (
                    <Cell key={`bar-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-[#3E4258]/60 text-sm">
              No contributor distribution data available.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

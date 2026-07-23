import React from 'react';
import { Card } from '../common/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Code, Layers } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface LanguagePieChartProps {
  languages: Record<string, number>;
}

export const LanguagePieChart: React.FC<LanguagePieChartProps> = ({ languages }) => {
  const entries = Object.entries(languages || {});
  const totalBytes = entries.reduce((acc, [_, bytes]) => acc + (typeof bytes === 'number' ? bytes : 0), 0);


  const chartData = entries
    .map(([lang, bytes]) => ({
      name: lang,
      value: bytes,
      percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : '0',
    }))
    .slice(0, 7);

  const colors = [
    '#1C2541',
    '#8A6C2E',
    '#C9A15E',
    '#059669',
    '#3E4258',
    '#4A5568',
    '#94A3B8',
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#E2D9CD] mb-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-[#1C2541]" />
            <h3 className="text-lg font-bold text-[#12172A]">Language Breakdown</h3>
          </div>
          <span className="text-xs text-[#3E4258]/70 font-mono flex items-center gap-1">
            <Layers className="h-3 w-3" /> {entries.length} Languages
          </span>
        </div>

        <div className="h-52 w-full flex items-center justify-center">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2D9CD', borderRadius: '12px', color: '#12172A', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(value: any, name: any, item: any) => [
                    `${formatNumber(value)} bytes (${item.payload.percentage}%)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-[#3E4258]/60 text-sm">
              No language breakdown available.
            </div>
          )}
        </div>

        {/* Custom Legend */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E2D9CD]">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs text-[#12172A] font-medium">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
              <span>{item.name}</span>
              <span className="text-[#3E4258]/70 font-mono text-[10px]">({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

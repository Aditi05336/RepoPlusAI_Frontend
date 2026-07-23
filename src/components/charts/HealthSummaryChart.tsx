import React from 'react';
import { CategoryScores } from '../../types/repository';
import { Card } from '../common/Card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface HealthSummaryChartProps {
  scores: CategoryScores;
}

export const HealthSummaryChart: React.FC<HealthSummaryChartProps> = ({ scores }) => {
  const safeScores = scores || {
    activity_score: 0,
    issue_score: 0,
    contributor_score: 0,
    documentation_score: 0,
    release_score: 0,
    commit_quality_score: 0,
  };

  const chartData = [
    { subject: 'Activity', score: safeScores.activity_score ?? 0, fullMark: 100 },
    { subject: 'Issue Res.', score: safeScores.issue_score ?? 0, fullMark: 100 },
    { subject: 'Contributors', score: safeScores.contributor_score ?? 0, fullMark: 100 },
    { subject: 'Docs', score: safeScores.documentation_score ?? 0, fullMark: 100 },
    { subject: 'Releases', score: safeScores.release_score ?? 0, fullMark: 100 },
    { subject: 'Commit Quality', score: safeScores.commit_quality_score ?? 0, fullMark: 100 },
  ];


  return (
    <Card className="h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4 border-b border-[#E2D9CD] mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#1C2541]" />
          <h3 className="text-lg font-bold text-[#12172A]">Health Category Profile</h3>
        </div>
        <span className="text-xs text-[#3E4258]/70 font-mono">Radar Analysis</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#E2D9CD" />
            <PolarAngleAxis dataKey="subject" stroke="#3E4258" tick={{ fill: '#3E4258', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#E2D9CD" tick={{ fill: '#3E4258', fontSize: 9 }} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#1C2541"
              fill="#8A6C2E"
              fillOpacity={0.3}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2D9CD', borderRadius: '12px', color: '#12172A', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              itemStyle={{ color: '#1C2541' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

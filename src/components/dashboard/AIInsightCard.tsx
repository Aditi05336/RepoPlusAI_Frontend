import React from 'react';
import { AIInsights } from '../../types/repository';
import { Card } from '../common/Card';
import { getRiskColor } from '../../utils/formatters';
import { Bot, CheckCircle2, AlertTriangle, ShieldAlert, Lightbulb, Zap } from 'lucide-react';

interface AIInsightCardProps {
  insights: AIInsights;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insights }) => {
  const safeInsights = insights || {
    overall_summary: 'No AI insights available.',
    risk_level: 'Medium',
    source: 'fallback',
    strengths: [],
    weaknesses: [],
    recommendations: [],
  };

  const riskColors = getRiskColor(safeInsights.risk_level || 'Medium');

  return (
    <Card gradient className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2D9CD] mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#059669]/10 text-[#059669] border border-[#059669]/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#12172A]">AI Executive Summary</h3>
            <p className="text-xs text-[#3E4258]">Natural Language Reasoning Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#3E4258] font-medium">Risk Assessment:</span>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold font-mono ${riskColors.bg} ${riskColors.text} ${riskColors.border}`}>
            <ShieldAlert className="h-3.5 w-3.5" />
            {safeInsights.risk_level} Risk
          </span>
          <span className="px-2 py-0.5 rounded bg-white text-[10px] text-[#3E4258] font-mono border border-[#E2D9CD]">
            source: {safeInsights.source}
          </span>
        </div>
      </div>

      {/* Executive Summary Paragraph */}
      <div className="p-4 rounded-xl bg-white/80 border border-[#E2D9CD] mb-6 text-[#12172A] text-sm leading-relaxed font-normal">
        {safeInsights.overall_summary}
      </div>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Key Strengths */}
        <div className="p-4 rounded-xl bg-[#059669]/5 border border-[#059669]/20">
          <h4 className="text-xs uppercase font-bold text-[#059669] tracking-wider mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#059669]" />
            Key Repository Strengths
          </h4>
          <ul className="space-y-2">
            {safeInsights.strengths && safeInsights.strengths.length > 0 ? (
              safeInsights.strengths.map((str, idx) => (
                <li key={idx} className="text-xs text-[#12172A] flex items-start gap-2 leading-normal">
                  <span className="text-[#059669] font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-[#3E4258]/60">No explicit strengths listed.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses / Vulnerabilities */}
        <div className="p-4 rounded-xl bg-[#B94A48]/5 border border-[#B94A48]/20">
          <h4 className="text-xs uppercase font-bold text-[#B94A48] tracking-wider mb-3 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-[#B94A48]" />
            Areas for Improvement
          </h4>
          <ul className="space-y-2">
            {safeInsights.weaknesses && safeInsights.weaknesses.length > 0 ? (
              safeInsights.weaknesses.map((weak, idx) => (
                <li key={idx} className="text-xs text-[#12172A] flex items-start gap-2 leading-normal">
                  <span className="text-[#B94A48] font-bold">•</span>
                  <span>{weak}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-[#3E4258]/60">No critical weaknesses detected.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      {safeInsights.recommendations && safeInsights.recommendations.length > 0 && (
        <div className="p-4 rounded-xl bg-[#1C2541]/5 border border-[#1C2541]/20">
          <h4 className="text-xs uppercase font-bold text-[#1C2541] tracking-wider mb-3 flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-[#8A6C2E]" />
            Actionable Recommendations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safeInsights.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-[#E2D9CD] text-xs text-[#12172A] shadow-xs">
                <Zap className="h-4 w-4 text-[#8A6C2E] shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

import React from 'react';
import { Activity, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import { PRESET_REPOSITORIES } from '../../utils/constants';

interface EmptyStateProps {
  onSelectPreset: (owner: string, repo: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectPreset }) => {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E2D9CD] text-[#12172A] text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#8A6C2E]" />
          Deterministic Analytics + ML Forecast + AI Reasoning
        </div>

        <h2 className="text-3xl font-extrabold text-[#12172A] tracking-tight sm:text-4xl mb-4">
          Analyze Any Public GitHub Repository Health
        </h2>
        <p className="text-[#3E4258] text-base leading-relaxed mb-10">
          Enter a GitHub owner and repository name above to compute health scores, bus factor, documentation quality, predict future commit trends, and generate AI recommendations.
        </p>

        {/* Preset Repositories Quick Select */}
        <div className="mb-12">
          <p className="text-xs uppercase font-semibold text-[#3E4258]/80 tracking-wider mb-4">
            Try a popular open-source repository
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {PRESET_REPOSITORIES.map((item) => (
              <button
                key={item.label}
                onClick={() => onSelectPreset(item.owner, item.repo)}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-[#E2D9CD] text-[#12172A] hover:border-[#1C2541]/40 hover:bg-white transition-all text-xs font-medium shadow-xs"
              >
                <span className="text-[#8A6C2E] group-hover:scale-110 transition-transform">⚡</span>
                <span>{item.label}</span>
                <span className="text-[10px] text-[#3E4258] bg-white px-1.5 py-0.5 rounded border border-[#E2D9CD]">
                  {item.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-2xl border border-[#E2D9CD]/70 bg-white/70 backdrop-blur-md shadow-xs hover:shadow-md transition-all">
            <div className="h-10 w-10 rounded-xl bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 flex items-center justify-center mb-3">
              <Activity className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-[#12172A] mb-1">Deterministic Analytics</h4>
            <p className="text-xs text-[#3E4258] leading-relaxed">
              7 weighted scoring algorithms for activity, issues, contributors, releases, & documentation.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2D9CD]/70 bg-white/70 backdrop-blur-md shadow-xs hover:shadow-md transition-all">
            <div className="h-10 w-10 rounded-xl bg-[#8A6C2E]/10 text-[#8A6C2E] border border-[#8A6C2E]/20 flex items-center justify-center mb-3">
              <Cpu className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-[#12172A] mb-1">ML Commit Forecasting</h4>
            <p className="text-xs text-[#3E4258] leading-relaxed">
              Linear regression models fit 52-week commit history to predict future activity trends.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2D9CD]/70 bg-white/70 backdrop-blur-md shadow-xs hover:shadow-md transition-all">
            <div className="h-10 w-10 rounded-xl bg-[#059669]/10 text-[#059669] border border-[#059669]/20 flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-[#12172A] mb-1">AI Reasoning Engine</h4>
            <p className="text-xs text-[#3E4258] leading-relaxed">
              LLM synthesizes strengths, weaknesses, bus factor risks, and actionable recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

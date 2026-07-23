import React from 'react';
import { Activity, ShieldCheck, Cpu, Bot } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#E2D9CD]/60 bg-white/60 backdrop-blur-md py-8 mt-20">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#12172A]">
          <Activity className="h-4 w-4 text-[#1C2541]" />
          <span>RepoPulse AI — GitHub Health Intelligence Engine</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#3E4258] font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1C2541]" /> Python Analytics
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-[#8A6C2E]" /> Scikit-Learn ML
          </span>
          <span className="flex items-center gap-1.5">
            <Bot className="h-3.5 w-3.5 text-[#059669]" /> AI Summaries
          </span>
        </div>

        <div className="text-xs text-[#3E4258]/70 font-mono">
          © {new Date().getFullYear()} RepoPulse AI. Built for production excellence.
        </div>
      </div>
    </footer>
  );
};

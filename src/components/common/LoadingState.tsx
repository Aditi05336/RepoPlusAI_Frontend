import React from 'react';
import { Activity } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      {/* Animated Pulse Ring Logo */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-white/80 border-2 border-[#E2D9CD] flex items-center justify-center animate-pulse">
          <Activity className="h-8 w-8 text-[#1C2541] animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-[#1C2541]/20 animate-ping"></div>
      </div>

      <h3 className="text-xl font-bold text-[#12172A] mb-2">Analyzing Repository Health</h3>
      <p className="text-[#3E4258] text-sm max-w-md mb-8">
        Fetching metadata, historical commit buckets, contributor statistics, and running deterministic scoring algorithms...
      </p>

      {/* Skeleton loader grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl border border-[#E2D9CD]/70 bg-white/70 backdrop-blur-md p-4 animate-pulse shadow-xs">
            <div className="h-4 w-2/3 bg-slate-200/50 rounded mb-3"></div>
            <div className="h-8 w-1/3 bg-slate-200/50 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-slate-200/50 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

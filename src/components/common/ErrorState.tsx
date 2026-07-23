import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from './Card';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="py-12 flex justify-center">
      <Card className="max-w-lg w-full text-center border-[#B94A48]/30 bg-[#B94A48]/5">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-[#B94A48] border border-rose-200">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-[#12172A] mb-2">Analysis Error</h3>
        <p className="text-sm text-[#3E4258] mb-6 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B94A48] hover:bg-[#963B3A] text-white transition-all font-semibold text-sm shadow-xs"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </Card>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';
import { Card } from '../components/common/Card';

export const NotFound: React.FC = () => {
  return (
    <div className="py-20 flex justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 border border-teal-200">
          <HelpCircle className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">404 - Page Not Found</h2>
        <p className="text-sm text-slate-600 mb-6">
          The dashboard route you requested does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20"
        >
          <Home className="h-4 w-4" /> Return to Home Search
        </Link>
      </Card>
    </div>
  );
};

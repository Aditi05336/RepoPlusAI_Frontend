import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, CheckCircle, Save } from 'lucide-react';
import { Card } from '../components/common/Card';
import { useAnalysis } from '../context/AnalysisContext';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setIsMockSignedIn } = useAnalysis();

  const [currentUsername] = useState('aditi_rajput');
  const [newUsername, setNewUsername] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSaveUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim()) {
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 3000);
      setNewUsername('');
    }
  };

  const handleLogout = () => {
    setIsMockSignedIn(false);
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#12172A] tracking-tight">Settings</h1>
        <p className="text-[#3E4258] text-sm mt-1">Manage your account preferences</p>
      </div>

      {savedFeedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-[#059669]" />
          <span>Username updated successfully! (UI Demo)</span>
        </div>
      )}

      {/* 1. Change Username Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#E2D9CD] mb-6">
          <User className="h-5 w-5 text-[#1C2541]" />
          <h3 className="text-lg font-bold text-[#12172A]">Change Username</h3>
        </div>

        <form onSubmit={handleSaveUsername} className="space-y-4 max-w-md">
          {/* Current Username (Read-only) */}
          <div>
            <label className="block text-xs font-semibold text-[#12172A] mb-1.5">Current Username</label>
            <input
              type="text"
              readOnly
              value={currentUsername}
              className="w-full h-11 px-4 rounded-xl border border-[#E2D9CD] bg-slate-100 text-[#3E4258] text-sm font-mono cursor-not-allowed"
            />
          </div>

          {/* New Username */}
          <div>
            <label className="block text-xs font-semibold text-[#12172A] mb-1.5">New Username</label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              className="w-full h-11 px-4 rounded-xl border border-[#E2D9CD] bg-white text-[#12172A] text-sm focus:border-[#1C2541] focus:ring-2 focus:ring-[#1C2541]/20 focus:outline-none transition-all"
            />
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="h-11 px-6 rounded-xl bg-[#1C2541] hover:bg-[#141B30] text-white font-bold text-sm shadow-md shadow-[#1C2541]/20 transition-all flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </form>
      </Card>

      {/* 2. Logout Section */}
      <Card className="p-6 border-[#B94A48]/30 bg-[#B94A48]/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#12172A]">Sign Out of Session</h3>
            <p className="text-xs text-[#3E4258] mt-1">End your current session on this browser.</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-[#B94A48] hover:bg-[#963B3A] text-white font-bold text-xs shadow-md shadow-[#B94A48]/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

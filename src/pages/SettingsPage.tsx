import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, CheckCircle, Save, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { useAnalysis } from '../context/AnalysisContext';
import { updateUsername } from '../api/auth';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, updateUser, logout } = useAnalysis();

  const currentUsername = user?.github_username || user?.username || user?.name || '';
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  const handleSaveUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSavedFeedback(null);

    const trimmed = newUsername.trim();
    if (!trimmed) {
      setError('Username cannot be empty.');
      return;
    }

    if (!token) {
      setError('Session expired or unauthorized. Please log in again.');
      return;
    }

    setLoading(true);

    try {
      const response = await updateUsername(token, trimmed);
      if (response.success && response.user) {
        updateUser(response.user);
        setSavedFeedback(response.message || 'Username updated successfully!');
        setNewUsername('');
        setTimeout(() => setSavedFeedback(null), 4000);
      } else {
        setError(response.error || 'Failed to update username.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#12172A] tracking-tight">Settings</h1>
        <p className="text-[#3E4258] text-sm mt-1">Manage your account preferences</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-2 animate-shake">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {savedFeedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-[#059669] shrink-0" />
          <span>{savedFeedback}</span>
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
            disabled={loading}
            className="h-11 px-6 rounded-xl bg-[#1C2541] hover:bg-[#141B30] disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-[#1C2541]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
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
            className="px-5 py-2.5 rounded-xl bg-[#B94A48] hover:bg-[#963B3A] text-white font-bold text-xs shadow-md shadow-[#B94A48]/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </Card>
    </div>
  );
};


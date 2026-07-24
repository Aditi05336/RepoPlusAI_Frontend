import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Github, Calendar, Edit3, Shield } from 'lucide-react';
import { Card } from '../components/common/Card';
import { useAnalysis } from '../context/AnalysisContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAnalysis();

  const displayName = user?.username || user?.name || 'Developer User';
  const displayEmail = user?.email || 'user@example.com';
  const displayGithub = user?.github_username || 'octocat';
  const displayUsername = user?.username || user?.github_username || 'octocat';

  // Calculate user avatar initials (e.g., "Adit Sharma" -> "AS", "Aditi Rajput" -> "AR")
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(displayName);

  // Format member creation date
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'July 2026';

  const handleEditProfile = () => {
    navigate('/settings');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#12172A] tracking-tight">User Profile</h1>
        <p className="text-[#3E4258] text-sm mt-1">Manage your account information and preferences</p>
      </div>

      {/* Main Profile Card */}
      <Card className="p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#E2D9CD]">
          {/* Avatar Initials */}
          <div className="relative">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-[#1C2541] to-[#8A6C2E] text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-[#1C2541]/20">
              {initials}
            </div>
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#059669] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          </div>

          {/* User Details Overview */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl font-bold text-[#12172A]">{displayName}</h2>
              <button
                onClick={handleEditProfile}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#1C2541] text-[#1C2541] hover:bg-[#1C2541]/5 font-semibold text-xs transition-all shadow-xs cursor-pointer"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            <p className="text-[#3E4258] text-sm font-medium">@{displayUsername}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#8A6C2E]/10 border border-[#8A6C2E]/30 text-[#8A6C2E] text-xs font-semibold">
              Pro Member
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">Full Name</div>
              <div className="text-sm font-bold text-[#12172A]">{displayName}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">Email Address</div>
              <div className="text-sm font-bold text-[#12172A]">{displayEmail}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <Github className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">GitHub Username</div>
              <div className="text-sm font-bold text-[#12172A]">@{displayGithub}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">Member Since</div>
              <div className="text-sm font-bold text-[#12172A]">{memberSince}</div>
            </div>
          </div>
        </div>

        {/* Security Status Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#059669]/5 border border-[#059669]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-[#059669]" />
            <span className="text-xs font-semibold text-[#12172A]">Account Security Status:</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-bold font-mono border border-[#059669]/20">
            Verified Account
          </span>
        </div>
      </Card>
    </div>
  );
};


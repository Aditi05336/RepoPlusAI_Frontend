import React, { useState } from 'react';
import { User, Mail, Github, Calendar, Edit3, Shield, CheckCircle } from 'lucide-react';
import { Card } from '../components/common/Card';

export const ProfilePage: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleEditClick = () => {
    setEditing(!editing);
    if (editing) {
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#12172A] tracking-tight">User Profile</h1>
        <p className="text-[#3E4258] text-sm mt-1">Manage your account information and preferences</p>
      </div>

      {savedFeedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-[#059669]" />
          <span>Profile changes saved successfully! (UI Demo)</span>
        </div>
      )}

      {/* Main Profile Card */}
      <Card className="p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#E2D9CD]">
          {/* Avatar Placeholder */}
          <div className="relative">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-[#1C2541] to-[#8A6C2E] text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-[#1C2541]/20">
              AR
            </div>
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#059669] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          </div>

          {/* User Details Overview */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl font-bold text-[#12172A]">Aditi Rajput</h2>
              <button
                onClick={handleEditClick}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#1C2541] text-[#1C2541] hover:bg-[#1C2541]/5 font-semibold text-xs transition-all shadow-xs"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>{editing ? 'Save Profile' : 'Edit Profile'}</span>
              </button>
            </div>

            <p className="text-[#3E4258] text-sm font-medium">@aditi-rajput</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#8A6C2E]/10 border border-[#8A6C2E]/30 text-[#8A6C2E] text-xs font-semibold">
              Pro Member
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">Full Name</div>
              <div className="text-sm font-bold text-[#12172A]">Aditi Rajput</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">Email Address</div>
              <div className="text-sm font-bold text-[#12172A]">aditi.rajput@example.com</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <Github className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">GitHub Username</div>
              <div className="text-sm font-bold text-[#12172A]">@aditi-rajput</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70">
            <div className="p-2.5 rounded-lg bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-[#3E4258] font-medium">Member Since</div>
              <div className="text-sm font-bold text-[#12172A]">January 2024</div>
            </div>
          </div>
        </div>

        {/* Security Summary Badge */}
        <div className="mt-8 p-4 rounded-xl bg-white/80 border border-[#E2D9CD]/70 flex items-center justify-between text-xs text-[#3E4258]">
          <span className="flex items-center gap-2 font-medium">
            <Shield className="h-4 w-4 text-[#8A6C2E]" /> Account Security Status:
          </span>
          <span className="font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Verified Account
          </span>
        </div>
      </Card>
    </div>
  );
};

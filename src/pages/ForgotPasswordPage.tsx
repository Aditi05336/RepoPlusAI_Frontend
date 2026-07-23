import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { Card } from '../components/common/Card';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-12 flex justify-center px-4 animate-fade-in">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-[#12172A] tracking-tight">Reset Your Password</h2>
          <p className="text-sm text-[#3E4258] mt-2">
            Enter your account email and we'll send you a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 mb-6">
            <CheckCircle2 className="h-8 w-8 text-[#059669] mx-auto" />
            <h4 className="text-sm font-bold text-emerald-800">Reset Link Sent</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Password reset link has been sent to <span className="font-semibold">{email}</span>. Please check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#12172A] mb-1.5">Email Address</label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-[#3E4258]/60">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D9CD] bg-white text-[#12172A] placeholder-[#3E4258]/60 text-sm focus:border-[#1C2541] focus:ring-2 focus:ring-[#1C2541]/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#1C2541] hover:bg-[#141B30] text-white font-bold text-sm shadow-md shadow-[#1C2541]/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Send Reset Link</span>
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/signin"
            className="inline-flex items-center gap-1.5 text-xs text-[#3E4258] hover:text-[#8A6C2E] font-semibold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

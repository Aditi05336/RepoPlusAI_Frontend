import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Github, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { useAnalysis } from '../context/AnalysisContext';
import { signupUser } from '../api/auth';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthSession } = useAnalysis();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await signupUser({
        name: fullName,
        email,
        github_username: githubUsername,
        password,
      });

      if (response.success && response.user && response.token) {
        setSuccess('Account created successfully! Redirecting...');
        setAuthSession(response.user, response.token);
        setTimeout(() => {
          navigate('/search');
        }, 1000);
      } else {
        setError(response.error || 'Registration failed. Please check your information.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex justify-center px-4 animate-fade-in">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-[#12172A] tracking-tight">Create Your Account</h2>
          <p className="text-sm text-[#3E4258] mt-2">Get started with RepoPulse AI in seconds</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2 animate-shake">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#12172A] mb-1.5">Full Name</label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#3E4258]/60">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D9CD] bg-white text-[#12172A] placeholder-[#3E4258]/60 text-sm focus:border-[#1C2541] focus:ring-2 focus:ring-[#1C2541]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Input */}
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

          {/* GitHub Username Input */}
          <div>
            <label className="block text-xs font-semibold text-[#12172A] mb-1.5">GitHub Username</label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#3E4258]/60">
                <Github className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="octocat"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D9CD] bg-white text-[#12172A] placeholder-[#3E4258]/60 text-sm focus:border-[#1C2541] focus:ring-2 focus:ring-[#1C2541]/20 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-[#12172A] mb-1.5">Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#3E4258]/60">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D9CD] bg-white text-[#12172A] placeholder-[#3E4258]/60 text-sm focus:border-[#1C2541] focus:ring-2 focus:ring-[#1C2541]/20 focus:outline-none transition-all"
              />
            </div>
            <p className="text-[10px] text-[#3E4258]/70 mt-1">
              Must be at least 8 chars with uppercase, lowercase, digit & symbol.
            </p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-xs font-semibold text-[#12172A] mb-1.5">Confirm Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#3E4258]/60">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D9CD] bg-white text-[#12172A] placeholder-[#3E4258]/60 text-sm focus:border-[#1C2541] focus:ring-2 focus:ring-[#1C2541]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#1C2541] hover:bg-[#141B30] disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-[#1C2541]/20 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Bottom Text */}
        <div className="mt-8 text-center text-xs text-[#3E4258]">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#8A6C2E] hover:text-[#1C2541] font-bold transition-colors">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

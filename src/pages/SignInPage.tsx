import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Github, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { useAnalysis } from '../context/AnalysisContext';
import { loginUser } from '../api/auth';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthSession } = useAnalysis();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      if (response.success && response.user && response.token) {
        setSuccess('Signed in successfully! Redirecting...');
        setAuthSession(response.user, response.token);
        setTimeout(() => {
          navigate('/search');
        }, 1000);
      } else {
        setError(response.error || 'Invalid email or password.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex justify-center px-4 animate-fade-in">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-[#12172A] tracking-tight">Sign In to RepoPulse AI</h2>
          <p className="text-sm text-[#3E4258] mt-2">Enter your credentials to access your account</p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
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
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#3E4258]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#E2D9CD] text-[#1C2541] focus:ring-[#1C2541]"
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="text-[#8A6C2E] hover:text-[#1C2541] font-semibold transition-colors">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#1C2541] hover:bg-[#141B30] disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-[#1C2541]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Bottom Text */}
        <div className="mt-8 text-center text-xs text-[#3E4258]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#8A6C2E] hover:text-[#1C2541] font-bold transition-colors">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};

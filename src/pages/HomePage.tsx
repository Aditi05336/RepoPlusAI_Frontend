import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bot,
  Cpu,
  ShieldCheck,
  Users,
  BarChart3,
  Search,
  Sparkles,
  Zap,
  Code,
  Layers,
  Terminal,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { useAnalysis } from '../context/AnalysisContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isMockSignedIn } = useAnalysis();

  return (
    <div className="space-y-20 lg:space-y-28 py-8 animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16 pt-6 sm:pt-12 pb-12 text-center">
        {/* Glow backdrop decorative light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#C9A15E]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/80 border border-[#E2D9CD] text-[#12172A] text-xs font-semibold mb-6 sm:mb-8 shadow-xs max-w-full">
          <Sparkles className="h-4 w-4 text-[#8A6C2E] animate-pulse shrink-0" />
          <span className="truncate">Real-Time GitHub Health Intelligence & Predictive Analytics</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#12172A] max-w-5xl mx-auto leading-tight mb-6 font-serif">
          Evaluate Any GitHub Repository <br className="hidden sm:inline" />
          <span className="text-[#8A6C2E] italic">
            Health and Trajectory
          </span>
        </h1>

        {/* Short Description */}
        <p className="text-[#3E4258] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
          Analyze code velocity, contributor diversity, bus factor risks, issue resolution metrics, and ML commit forecasts for any public GitHub repo in seconds.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => navigate(isMockSignedIn ? '/search' : '/signin')}
            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#1C2541] hover:bg-[#141B30] text-white font-bold text-sm md:text-base shadow-lg shadow-[#1C2541]/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap group cursor-pointer"
          >
            <span>Analyze Repository</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {!isMockSignedIn ? (
            <button
              onClick={() => navigate('/signin')}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white/90 border border-[#1C2541] hover:bg-[#1C2541]/5 text-[#1C2541] font-bold text-sm md:text-base shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white/90 border border-[#1C2541] hover:bg-[#1C2541]/5 text-[#1C2541] font-bold text-sm md:text-base shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Go to Dashboard</span>
            </button>
          )}
        </div>

        {/* Quick Hero Stat Badges */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 shadow-xs">
            <div className="text-xl sm:text-2xl font-extrabold text-[#12172A] font-mono">100%</div>
            <div className="text-xs text-[#3E4258] font-medium mt-0.5">Deterministic Scoring</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 shadow-xs">
            <div className="text-xl sm:text-2xl font-extrabold text-[#8A6C2E] font-mono">52-Wk</div>
            <div className="text-xs text-[#3E4258] font-medium mt-0.5">Commit Trend Pipeline</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 shadow-xs">
            <div className="text-xl sm:text-2xl font-extrabold text-[#8A6C2E] font-mono">ML Slope</div>
            <div className="text-xs text-[#3E4258] font-medium mt-0.5">OLS Predictive Model</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 shadow-xs">
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C2541] font-mono">LLM AI</div>
            <div className="text-xs text-[#3E4258] font-medium mt-0.5">Executive Risk Summary</div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-[#8A6C2E] mb-2">Capabilities</h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12172A] tracking-tight">
            Engineered for Deep Repository Insights
          </h3>
          <p className="text-[#3E4258] text-sm sm:text-base mt-3">
            Combining deterministic statistical formulas with Scikit-Learn regression models and AI reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <Card className="hover:border-[#1C2541]/40 h-full flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#12172A] mb-2">7-Factor Health Scoring</h4>
              <p className="text-sm text-[#3E4258] leading-relaxed">
                Weighted algorithms evaluating commit velocity, issue resolution time, contributor distribution, documentation depth, and release cadence.
              </p>
            </div>
          </Card>

          <Card className="hover:border-[#8A6C2E]/40 h-full flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-[#8A6C2E]/10 text-[#8A6C2E] border border-[#8A6C2E]/20 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#12172A] mb-2">ML Commit Activity Forecast</h4>
              <p className="text-sm text-[#3E4258] leading-relaxed">
                Scikit-learn linear regression models fit 52-week historical commit velocity to project future development trends.
              </p>
            </div>
          </Card>

          <Card className="hover:border-[#059669]/40 h-full flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-[#059669]/10 text-[#059669] border border-[#059669]/20 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#12172A] mb-2">AI Executive Summaries</h4>
              <p className="text-sm text-[#3E4258] leading-relaxed">
                Natural language reasoning engine synthesizes key repository strengths, weaknesses, vulnerabilities, and actionable recommendations.
              </p>
            </div>
          </Card>

          <Card className="hover:border-[#B94A48]/40 h-full flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-[#B94A48]/10 text-[#B94A48] border border-[#B94A48]/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#12172A] mb-2">Bus Factor Risk Alert</h4>
              <p className="text-sm text-[#3E4258] leading-relaxed">
                Calculates maintainer reliance to identify single points of failure in open-source contributor distribution.
              </p>
            </div>
          </Card>

          <Card className="hover:border-[#1C2541]/40 h-full flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#12172A] mb-2">Interactive Visualizations</h4>
              <p className="text-sm text-[#3E4258] leading-relaxed">
                Rich Recharts suite featuring 52-week trendlines, contributor bar charts, health radar profiles, and language pie charts.
              </p>
            </div>
          </Card>

          <Card className="hover:border-[#8A6C2E]/40 h-full flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-[#8A6C2E]/10 text-[#8A6C2E] border border-[#8A6C2E]/20 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#12172A] mb-2">Instant Public Repo Access</h4>
              <p className="text-sm text-[#3E4258] leading-relaxed">
                Zero installation or configuration needed. Type any GitHub `owner/repo` identifier for real-time analysis.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-14 border border-[#E2D9CD]/70 shadow-xs">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-[#8A6C2E] mb-2">Architecture</h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12172A] tracking-tight">How RepoPulse AI Works</h3>
            <p className="text-[#3E4258] text-sm sm:text-base mt-3">From raw GitHub REST API metadata to actionable predictive reports in 4 steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/80 border border-[#E2D9CD]/70 text-left relative flex flex-col justify-between h-full">
              <div>
                <span className="text-3xl font-extrabold text-[#8A6C2E] font-mono block mb-3">01</span>
                <h4 className="text-base font-bold text-[#12172A] mb-2">Input Repository</h4>
                <p className="text-xs text-[#3E4258] leading-relaxed">
                  Enter any public GitHub owner and repository name in our search interface.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 border border-[#E2D9CD]/70 text-left relative flex flex-col justify-between h-full">
              <div>
                <span className="text-3xl font-extrabold text-[#8A6C2E] font-mono block mb-3">02</span>
                <h4 className="text-base font-bold text-[#12172A] mb-2">Python Data Pipeline</h4>
                <p className="text-xs text-[#3E4258] leading-relaxed">
                  Flask API fetches commits, issues, contributors, languages, and license information.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 border border-[#E2D9CD]/70 text-left relative flex flex-col justify-between h-full">
              <div>
                <span className="text-3xl font-extrabold text-[#8A6C2E] font-mono block mb-3">03</span>
                <h4 className="text-base font-bold text-[#12172A] mb-2">ML & AI Engine</h4>
                <p className="text-xs text-[#3E4258] leading-relaxed">
                  Scikit-Learn computes linear regression slope while LLM synthesizes risk analysis.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 border border-[#E2D9CD]/70 text-left relative flex flex-col justify-between h-full">
              <div>
                <span className="text-3xl font-extrabold text-[#8A6C2E] font-mono block mb-3">04</span>
                <h4 className="text-base font-bold text-[#12172A] mb-2">Interactive Dashboard</h4>
                <p className="text-xs text-[#3E4258] leading-relaxed">
                  Explore health breakdown meters, radar profiles, commit charts, and AI recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY STACK SECTION */}
      <section className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-[#8A6C2E] mb-2">Tech Stack</h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12172A] tracking-tight">Built with Enterprise Technologies</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 text-center shadow-xs">
            <Code className="h-7 w-7 text-[#1C2541] mx-auto mb-2" />
            <div className="text-sm font-bold text-[#12172A]">React + TS</div>
            <div className="text-xs text-[#3E4258] mt-0.5">Frontend UI</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 text-center shadow-xs">
            <Zap className="h-7 w-7 text-[#8A6C2E] mx-auto mb-2" />
            <div className="text-sm font-bold text-[#12172A]">Tailwind CSS</div>
            <div className="text-xs text-[#3E4258] mt-0.5">Design System</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 text-center shadow-xs">
            <Terminal className="h-7 w-7 text-[#1C2541] mx-auto mb-2" />
            <div className="text-sm font-bold text-[#12172A]">Python Flask</div>
            <div className="text-xs text-[#3E4258] mt-0.5">Backend API</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#E2D9CD]/70 text-center shadow-xs">
            <Layers className="h-7 w-7 text-[#8A6C2E] mx-auto mb-2" />
            <div className="text-sm font-bold text-[#12172A]">Scikit-Learn</div>
            <div className="text-xs text-[#3E4258] mt-0.5">ML Forecasts</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export interface RepositoryOverview {
  full_name: string;
  description: string | null;
  stars: number;
  forks: number;
  watchers: number;
  open_issues_count: number;
  default_branch: string;
  license: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  is_archived: boolean;
  html_url: string;
}

export interface CategoryScores {
  overall_health: number;
  activity_score: number;
  issue_score: number;
  contributor_score: number;
  bus_factor: number;
  documentation_score: number;
  release_score: number;
  commit_quality_score: number;
}

export interface CommitWeek {
  week_start: string;
  commit_count: number;
}

export interface CommitForecast {
  predicted_next_week_commits: number;
  trend: 'increasing' | 'stable' | 'declining' | 'insufficient_data';
  method: 'linear_regression' | 'fallback';
  weekly_commit_history: CommitWeek[];
}

export interface Contributor {
  login: string;
  contributions: number;
  avatar_url?: string;
  html_url?: string;
}

export interface AIInsights {
  overall_summary: string;
  strengths: string[];
  weaknesses: string[];
  risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendations: string[];
  source: 'groq' | 'grok' | 'fallback';
}

export interface AnalysisData {
  repository: RepositoryOverview;
  scores: CategoryScores;
  forecast: CommitForecast;
  contributors: Contributor[];
  languages: Record<string, number>;
  ai_insights: AIInsights;
}

export interface AnalyzeResponse {
  success: boolean;
  cached?: boolean;
  data?: AnalysisData;
  error?: string;
  details?: any;
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getScoreColor(score: number): { text: string; bg: string; border: string; badge: string } {
  if (score >= 75) {
    return {
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }
  if (score >= 50) {
    return {
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
    };
  }
  return {
    text: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
  };
}

export function getRiskColor(risk: string): { text: string; bg: string; border: string } {
  switch (risk.toLowerCase()) {
    case 'low':
      return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    case 'medium':
      return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
    case 'high':
    case 'critical':
      return { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' };
    default:
      return { text: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200' };
  }
}

export function parseGitHubInput(input: string): { owner: string; repo: string } | null {
  let cleaned = input.trim();
  if (!cleaned) return null;

  // Strip trailing slashes and .git
  cleaned = cleaned.replace(/\/+$/, '').replace(/\.git$/i, '');

  // Case 1: Full URL like https://github.com/owner/repo or github.com/owner/repo
  if (cleaned.includes('github.com/')) {
    const afterDomain = cleaned.split('github.com/')[1];
    const parts = afterDomain.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0].trim(), repo: parts[1].trim() };
    }
  }

  // Case 2: owner/repo format
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0].trim(), repo: parts[1].trim() };
    }
  }

  // Case 3: Just repo name
  return { owner: 'facebook', repo: cleaned };
}


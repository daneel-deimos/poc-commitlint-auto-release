'use client';

import { useState, useEffect } from 'react';

interface GitLogData {
  commits: string[];
}

export default function GitLog() {
  const [commits, setCommits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitLog = async () => {
      try {
        const response = await fetch('/api/git-log');
        if (!response.ok) {
          throw new Error('Failed to fetch git log');
        }
        const data: GitLogData = await response.json();
        setCommits(data.commits);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchGitLog();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Recent Commits</h2>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-gray-600 dark:text-gray-400">Loading git log...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Recent Commits</h2>
        <div className="bg-red-100 dark:bg-red-900 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Recent Commits ({commits.length})</h2>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
        <pre className="font-mono text-sm whitespace-pre-wrap">
          {commits.length > 0 ? commits.join('\n') : 'No commits found'}
        </pre>
      </div>
    </div>
  );
}
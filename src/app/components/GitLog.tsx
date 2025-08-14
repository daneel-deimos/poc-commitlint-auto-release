'use client';

import { useState, useEffect } from 'react';

interface GitLogData {
  commits: string[];
}

interface ParsedCommit {
  hash: string;
  type: string;
  message: string;
  fullLine: string;
}

const parseCommit = (commitLine: string): ParsedCommit => {
  const match = commitLine.match(/^([a-f0-9]+)\s+(.+)$/);
  if (!match) {
    return {
      hash: '',
      type: '',
      message: commitLine,
      fullLine: commitLine
    };
  }
  
  const [, hash, message] = match;
  const typeMatch = message.match(/^(\w+)(\(.+\))?:\s*(.+)$/);
  
  if (typeMatch) {
    const [, type, , restMessage] = typeMatch;
    return {
      hash,
      type,
      message: restMessage,
      fullLine: commitLine
    };
  }
  
  return {
    hash,
    type: '',
    message,
    fullLine: commitLine
  };
};

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

  const parsedCommits = commits.map(parseCommit);

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Recent Commits ({commits.length})</h2>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
        {commits.length > 0 ? (
          <div className="space-y-2">
            {parsedCommits.map((commit, index) => (
              <div
                key={index}
                className={`font-mono text-sm p-2 rounded ${
                  commit.type === 'feat'
                    ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-gray-500 dark:text-gray-400">{commit.hash}</span>
                {commit.type && (
                  <>
                    {' '}
                    <span className={`font-semibold ${
                      commit.type === 'feat' 
                        ? 'text-green-700 dark:text-green-300' 
                        : commit.type === 'fix'
                        ? 'text-red-600 dark:text-red-400'
                        : commit.type === 'docs'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {commit.type}:
                    </span>
                    {' '}
                    <span>{commit.message}</span>
                  </>
                )}
                {!commit.type && (
                  <>
                    {' '}
                    <span>{commit.message}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">No commits found</p>
        )}
      </div>
    </div>
  );
}
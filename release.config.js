module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [{ type: 'chore', scope: 'deps', release: 'patch' }],
      },
    ],
    [
      '@semantic-release/npm',
      {
        tarballDir: 'release',
      },
    ],
    '@semantic-release/git',
  ],
  preset: 'angular',
};

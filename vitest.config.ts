import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: ['index.ts'],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 100,
        lines: 90,
      },
    },
  },
});

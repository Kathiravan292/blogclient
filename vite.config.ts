import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const srcDir = path.resolve(import.meta.dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        // Lets modules import as `@/api/blog.api` instead of counting `../`s.
        // The replacement is posix-normalised because Rollup's resolver does not
        // accept the mixed separators a raw Windows path would produce.
        find: /^@\//,
        replacement: `${srcDir.split(path.sep).join('/')}/`,
      },
    ],
  },
  server: {
    port: 5173,
  },
});

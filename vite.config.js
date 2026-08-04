import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { generateAllTALLevels } from './scripts/talGeneratorLib.js';

const levelsDir = path.resolve(__dirname, 'src/timeArrow/levels');
if (!fs.existsSync(path.join(levelsDir, 'TAL100.jsx'))) {
  try {
    generateAllTALLevels(levelsDir);
  } catch (err) {
    console.warn('Could not auto-generate TAL levels at vite config parse time:', err.message);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'time-arrow-levels-builder',
      buildStart() {
        if (!fs.existsSync(path.join(levelsDir, 'TAL100.jsx'))) {
          generateAllTALLevels(levelsDir);
        }
      }
    }
  ],
});

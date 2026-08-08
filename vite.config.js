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
    },
    {
      name: 'level-editor-server-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/save-level' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                const { filePath, content } = JSON.parse(body);
                if (!filePath || !content) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ success: false, error: 'Missing filePath or content' }));
                  return;
                }
                const targetPath = path.resolve(process.cwd(), filePath);
                const targetDir = path.dirname(targetPath);
                if (!fs.existsSync(targetDir)) {
                  fs.mkdirSync(targetDir, { recursive: true });
                }
                fs.writeFileSync(targetPath, content, 'utf-8');

                // Programmatic verification check on disk
                const fileExists = fs.existsSync(targetPath);
                const stats = fileExists ? fs.statSync(targetPath) : null;

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  filePath,
                  filename: path.basename(filePath),
                  verified: fileExists && stats.size > 0,
                  sizeBytes: stats ? stats.size : 0,
                  message: `Successfully saved and verified level file ${filePath}`
                }));
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }

          if (req.url === '/api/verify-level' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                const { filePath } = JSON.parse(body);
                const targetPath = path.resolve(process.cwd(), filePath);
                const exists = fs.existsSync(targetPath);
                if (exists) {
                  const content = fs.readFileSync(targetPath, 'utf-8');
                  const stats = fs.statSync(targetPath);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: true,
                    exists: true,
                    verified: true,
                    sizeBytes: stats.size,
                    content
                  }));
                } else {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, exists: false, error: 'File does not exist on disk' }));
                }
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }

          if (req.url === '/api/delete-level' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                const { filePath } = JSON.parse(body);
                const targetPath = path.resolve(process.cwd(), filePath);
                if (fs.existsSync(targetPath)) {
                  fs.unlinkSync(targetPath);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, message: `Deleted ${filePath}` }));
                } else {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'File not found' }));
                }
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: e.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
});

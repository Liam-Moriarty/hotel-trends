import { build } from 'esbuild';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// Mark all direct npm deps as external (only @repo/* gets bundled inline)
const external = [
  ...Object.keys(pkg.dependencies ?? {}).filter((k) => !k.startsWith('@repo/')),
  'node:*',
];

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: 'dist/index.js',
  external,
});

// Generate a clean package.json for Cloud Build (no workspace:* deps)
mkdirSync('dist', { recursive: true });
writeFileSync(
  'dist/package.json',
  JSON.stringify(
    {
      main: 'index.js',
      type: 'module',
      engines: { node: '20' },
      dependencies: Object.fromEntries(
        Object.entries(pkg.dependencies ?? {}).filter(([k]) => !k.startsWith('@repo/'))
      ),
    },
    null,
    2
  )
);

// Generate TypeScript declaration files so consumers (e.g. web) can import types
execSync('tsc --emitDeclarationOnly --noEmit false', { stdio: 'inherit' });

console.log('Functions bundled to dist/index.js');

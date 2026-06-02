import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newVersion = process.argv[2];

if (!newVersion) {
  console.error('\x1b[31mError: Please provide a new version number (e.g. node scripts/bump-version.js 0.1.1)\x1b[0m');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const packageJsonPaths = [
  path.join(rootDir, 'package.json'),
  path.join(rootDir, 'apps/web/package.json'),
  path.join(rootDir, 'packages/cli/package.json'),
  path.join(rootDir, 'packages/shared/package.json'),
];

packageJsonPaths.forEach((pkgPath) => {
  if (fs.existsSync(pkgPath)) {
    const fileContent = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(fileContent);
    const oldVersion = pkg.version;
    pkg.version = newVersion;
    
    // Write back with 2 spaces indentation
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`\x1b[32m✔ Updated ${path.relative(rootDir, pkgPath)}: ${oldVersion} -> ${newVersion}\x1b[0m`);
  } else {
    console.warn(`\x1b[33m⚠ Could not find ${path.relative(rootDir, pkgPath)}\x1b[0m`);
  }
});

console.log(`\n\x1b[34mAll package.json versions bumped to ${newVersion}!\x1b[0m`);

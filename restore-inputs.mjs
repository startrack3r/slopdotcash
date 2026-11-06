import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';

const root = process.argv[2];
if (!root) throw Error('Usage: node restore-inputs.mjs /absolute/path/to/disposable-checkout');
const directory = resolve(root);
const manifest = JSON.parse(readFileSync(new URL('./inputs.json', import.meta.url), 'utf8'));
const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: directory, encoding: 'utf8' }).trim();
if (![manifest.base, manifest.head].includes(head)) throw Error('Check out the measured base or PR head first');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const expectedPaths = ['public/data/leaderboard.json', 'src/lib/project-registry.generated.mjs', 'src/lib/project-revisions.generated.json'];
if (JSON.stringify(manifest.inputs.map(row => row.path)) !== JSON.stringify(expectedPaths)) throw Error('Unexpected input paths');
const rows = manifest.inputs.map(row => {
  const packed = readFileSync(new URL(row.file, import.meta.url));
  if (hash(packed) !== row.compressedSha256) throw Error(`Compressed input digest mismatch: ${row.path}`);
  const bytes = gunzipSync(packed);
  if (bytes.length !== row.bytes || hash(bytes) !== row.sha256) throw Error(`Input digest mismatch: ${row.path}`);
  return { ...row, bytes };
});
for (const row of rows) {
  const target = resolve(directory, row.path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, row.bytes);
}
console.log(`Restored ${rows.length} public benchmark inputs for ${head}`);

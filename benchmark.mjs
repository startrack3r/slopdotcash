import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Run with Bun from a disposable repository checkout. Module loading occurs
// before the timed generator call, as in the original measurement.
const output = process.argv[2];
const measuredRuns = Number(process.env.POINTS_BENCHMARK_RUNS ?? 2);
if (!output || !Number.isSafeInteger(measuredRuns) || measuredRuns < 1) {
  throw Error('Usage: POINTS_BENCHMARK_RUNS=2 bun /path/to/benchmark.mjs /path/to/report.json');
}
const { generatePoints } = await import(pathToFileURL(resolve('scripts/generate-points.ts')).href);
const manifest = JSON.parse(readFileSync(new URL('./inputs.json', import.meta.url), 'utf8'));
const original = JSON.parse(readFileSync(new URL('./results.json', import.meta.url), 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
for (const row of manifest.inputs) {
  if (hash(readFileSync(row.path)) !== row.sha256) throw Error(`Restore measured input first: ${row.path}`);
}
if (hash(readFileSync('data/points/history.json')) !== manifest.historySha256) throw Error('Different retained history');
const NativeDate = Date;
globalThis.Date = class extends NativeDate {
  constructor(...args) { super(...(args.length ? args : [manifest.publicationClock])); }
  static now() { return NativeDate.parse(manifest.publicationClock); }
};
const samples = [];
let hashes;
for (let index = 0; index <= measuredRuns; index++) {
  const start = performance.now();
  const journal = await generatePoints();
  const elapsed = performance.now() - start;
  hashes = Object.fromEntries(Object.keys(original.identicalOutputs).map(file => [file, hash(readFileSync(file))]));
  for (const [file, digest] of Object.entries(original.identicalOutputs)) {
    if (hashes[file] !== digest) throw Error(`Publication differs from original evidence: ${file}`);
  }
  if (index) samples.push(elapsed);
  console.log(JSON.stringify({ run: index, warmup: index === 0, ms: elapsed, revisions: journal.revisions.length, matchingOutputs: Object.keys(hashes).length }));
}
const sorted = [...samples].sort((a, b) => a - b);
const median = (sorted[Math.floor((sorted.length - 1) / 2)] + sorted[Math.floor(sorted.length / 2)]) / 2;
writeFileSync(output, JSON.stringify({ publicationClock: manifest.publicationClock, samples, median, hashes }, null, 2) + '\n');

// Painfully honest out-of-office auto-reply.
// The entry is one sentence: it admits the inbox grows faster than it can
// be read, stays warm and professional, and lands on a quotable turn.
import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "I'm out of the office until Monday, happily ignoring an inbox that grows faster than I can read it, and I'll reply to yours as soon as I'm back and brave enough to open it.";

// Gate the entry the way the sealed scorer will: UTF-8 text, 1 to 200
// characters, a single sentence (exactly one terminal full stop).
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to entry.txt`);

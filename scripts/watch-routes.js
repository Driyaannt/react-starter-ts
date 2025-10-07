import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, "../src/pages");

console.log("👀 Watching for changes in pages directory...");
console.log("📂 Watching:", PAGES_DIR);
console.log("Press Ctrl+C to stop\n");

let isGenerating = false;

function generateRoutes() {
  if (isGenerating) return;

  isGenerating = true;
  console.log("\n🔄 Change detected! Regenerating routes...");

  exec("node scripts/generate-routes.js", (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error:", error);
    } else {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
    isGenerating = false;
  });
}

// Initial generation
generateRoutes();

// Watch for changes
fs.watch(PAGES_DIR, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith(".tsx") || filename.endsWith(".ts"))) {
    console.log(`📝 File ${eventType}: ${filename}`);
    generateRoutes();
  }
});

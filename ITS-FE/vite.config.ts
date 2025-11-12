import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
function getEntriesFromDir(dirPath: string): Record<string, string> {
  return Object.fromEntries(
    fs
      .readdirSync(dirPath)
      .filter((name) => fs.statSync(path.join(dirPath, name)).isDirectory())
      .map((name) => [name, path.join(dirPath, name, `${name}.tsx`)])
  );
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: getEntriesFromDir(path.resolve(__dirname, "src/Component")),
      output: { entryFileNames: "[name]/[name].[format].js" },
    },
  },
});


import fs from "node:fs";
import path from "node:path";
import JavaScriptObfuscator from "javascript-obfuscator";

const targetDirectory = path.join(process.cwd(), "out", "_next", "static");

function obfuscateDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log("Directory not found:", directory);
    return;
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      obfuscateDirectory(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".js")) {
      const source = fs.readFileSync(fullPath, "utf8");

      const obfuscated = JavaScriptObfuscator.obfuscate(source, {
        compact: true,
        identifierNamesGenerator: "hexadecimal",
        renameGlobals: false,
        renameProperties: false,
        stringArray: true,
        stringArrayThreshold: 0.5,
        stringArrayRotate: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        selfDefending: false,
      });

      fs.writeFileSync(fullPath, obfuscated.getObfuscatedCode());

      console.log("Obfuscated:", fullPath);
    }
  }
}

obfuscateDirectory(targetDirectory);

console.log("JavaScript obfuscation completed.");

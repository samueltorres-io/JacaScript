#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { transpile } = require("../src/transpiler");

function printUsage() {
  console.log(`
🍈 JacaScript CLI

Usage:
  jaca build <input.jaca> [-o output.js]
  jaca <input.jaca> [-o output.js]

Examples:
  jaca examples/hello.jaca
  jaca build examples/hello.jaca -o dist/hello.js
`);
}

function parseArgs(argv) {
  const args = [...argv];
  const result = {
    command: null,
    input: null,
    output: null
  };

  if (args.length === 0) return result;

  if (args[0] === "build") {
    result.command = "build";
    args.shift();
  } else {
    result.command = "build";
  }

  result.input = args.shift() || null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-o" || args[i] === "--output") {
      result.output = args[i + 1] || null;
      i++;
    }
  }

  return result;
}

function defaultOutputPath(inputPath) {
  return inputPath.replace(/\.jaca$/i, ".js");
}

function ensureExt(inputPath) {
  return /\.jaca$/i.test(inputPath);
}

function buildFile(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }

  if (!ensureExt(inputPath)) {
    console.error("The input needs to end with .jaca");
    process.exit(1);
  }

  const code = fs.readFileSync(inputPath, "utf8");
  const output = transpile(code);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, output, "utf8");

  console.log(`🍈 Jaca peeled with success: ${outputPath}`);
}

const parsed = parseArgs(process.argv.slice(2));

if (!parsed.input) {
  printUsage();
  process.exit(1);
}

const outputPath = parsed.output || defaultOutputPath(parsed.input);
buildFile(parsed.input, outputPath);
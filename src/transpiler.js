const KEYWORDS = [
  { from: /\bjaca\b/g, to: "function" },
  { from: /\bcai\b/g, to: "return" },
  { from: /\bcacho\b/g, to: "let" },
  { from: /\bmadura\b/g, to: "const" },
  { from: /\bse\b/g, to: "if" },
  { from: /\bsenão\b/g, to: "else" },
  { from: /\benquanto\b/g, to: "while" },
  { from: /\btrepadeira\b/g, to: "class" },
  { from: /\bcaroço\b/g, to: "this" }
];

function transpile(code) {
  let output = code;

  for (const rule of KEYWORDS) {
    output = output.replace(rule.from, rule.to);
  }

  return output;
}

module.exports = { transpile };
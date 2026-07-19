// Generates e2e/fixtures/resume.pdf — a simple text-layer resume used by
// the autofill E2E tests. Run: node scripts/generate-fixture-resume.mjs
import { PDFDocument, StandardFonts } from "pdf-lib";
import { writeFileSync } from "fs";

const doc = await PDFDocument.create();
const page = doc.addPage([612, 792]);
const font = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);

const lines = [
  { text: "Priya Sharma", font: bold, size: 22 },
  { text: "priya.sharma@example.com", font, size: 12 },
  { text: "+1 (469) 555-0142", font, size: 12 },
  { text: "https://www.linkedin.com/in/priyasharma-dev", font, size: 12 },
  { text: "", font, size: 12 },
  { text: "Experience", font: bold, size: 14 },
  { text: "Senior Data Engineer - Example Corp (2021-present)", font, size: 11 },
  { text: "Built Snowflake pipelines processing 2TB daily.", font, size: 11 },
  { text: "Data Engineer - Sample Inc (2018-2021)", font, size: 11 },
  { text: "", font, size: 12 },
  { text: "Education", font: bold, size: 14 },
  { text: "B.Tech Computer Science, 2018", font, size: 11 },
];

let y = 740;
for (const l of lines) {
  if (l.text) page.drawText(l.text, { x: 60, y, size: l.size, font: l.font });
  y -= l.size + 10;
}

writeFileSync("e2e/fixtures/resume.pdf", await doc.save());
console.log("wrote e2e/fixtures/resume.pdf");

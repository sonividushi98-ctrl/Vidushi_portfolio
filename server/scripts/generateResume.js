const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  AlignmentType,
} = require("docx");

const filesDir = path.join(__dirname, "..", "files");
const pdfPath = path.join(filesDir, "Vidushisoni_Resume.pdf");
const docxPath = path.join(filesDir, "Vidushisoni_Resume.docx");

const lines = [
  "Vidushi Soni",
  "MERN Stack Developer",
  "B.Tech Computer Science student (2024 - Ongoing)",
  "JK Lakshmipat University, Jaipur, Rajasthan, India",
  "CGPA 8.23",
  "Email: sonividushi98@gmail.com",
  "GitHub: https://github.com/sonividushi98-ctrl",
  "LinkedIn: https://www.linkedin.com/in/vidushi-soni-908250369/",
  "",
  "I am a Computer Science undergraduate at JK Lakshmipat University with hands-on experience building AI-driven web apps (Virtual Closet, PetCare AI), relational database systems, and blockchain-integrated platforms. I am proficient in Python, C++ and SQL, and I am now focused on the MERN stack (React, Node.js, Express, MongoDB). I ship projects both independently and in teams.",
];

function ensureDir() {
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }
}

function generatePdf() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);
    doc.fontSize(20).text("Vidushi Soni", { align: "left" });
    doc.moveDown(0.3);
    doc.fontSize(11);
    lines.slice(1).forEach((line) => {
      doc.text(line || " ");
    });
    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function generateDocx() {
  const children = [
    new Paragraph({
      text: "Vidushi Soni",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.LEFT,
    }),
    ...lines.slice(1).map(
      (line) =>
        new Paragraph({
          children: [new TextRun({ text: line || " ", size: 22 })],
        })
    ),
  ];

  const document = new Document({
    sections: [{ children }],
  });

  const buffer = await Packer.toBuffer(document);
  fs.writeFileSync(docxPath, buffer);
}

async function generateMissingResumes() {
  ensureDir();
  const pdfExists = fs.existsSync(pdfPath);
  const docxExists = fs.existsSync(docxPath);

  if (pdfExists && docxExists) {
    console.log("[resume] original PDF and DOCX found. Skipping generation.");
    return;
  }

  if (!pdfExists) {
    await generatePdf();
    console.log("[resume] generated fallback PDF at", pdfPath);
  } else {
    console.log("[resume] original PDF present. Leaving it unchanged.");
  }

  if (!docxExists) {
    await generateDocx();
    console.log("[resume] generated fallback DOCX at", docxPath);
  } else {
    console.log("[resume] original DOCX present. Leaving it unchanged.");
  }
}

if (require.main === module) {
  generateMissingResumes().catch((error) => {
    console.error("[resume] generation failed:", error);
    process.exit(1);
  });
}

module.exports = { generateMissingResumes };

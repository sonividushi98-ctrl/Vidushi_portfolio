const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filesDir = path.join(__dirname, "..", "files");

function sendResume(res, next, filename, contentType) {
  const filePath = path.join(filesDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: `${filename} is not available on the server.`,
    });
  }

  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  return res.download(filePath, filename, (err) => {
    if (err) next(err);
  });
}

router.get("/pdf", (req, res, next) => {
  sendResume(res, next, "Vidushisoni_Resume.pdf", "application/pdf");
});

router.get("/docx", (req, res, next) => {
  sendResume(
    res,
    next,
    "Vidushisoni_Resume.docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
});

module.exports = router;

const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { connectDB } = require("./config/db");
const { generateMissingResumes } = require("./scripts/generateResume");
const healthRouter = require("./routes/health");
const resumeRouter = require("./routes/resume");
const contactRouter = require("./routes/contact");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

function getAllowedOrigins() {
  const extras = (process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...extras,
  ];
}

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = getAllowedOrigins();
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/health", healthRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/contact", contactRouter);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await generateMissingResumes();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
    console.log("[server] health: GET /api/health");
  });
}

start().catch((error) => {
  console.error("[server] failed to start:", error.message);
  process.exit(1);
});

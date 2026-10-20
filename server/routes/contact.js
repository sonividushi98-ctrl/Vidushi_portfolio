const express = require("express");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const Message = require("../models/Message");
const { sendContactNotification } = require("../utils/mailer");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages from this IP. Please try again in 15 minutes.",
  },
});

const validators = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be between 2 and 80 characters."),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .isLength({ max: 120 }),
  body("message")
    .trim()
    .escape()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters."),
];

router.post("/", contactLimiter, validators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const { name, email, message } = req.body;
    await Message.create({ name, email, message });

    try {
      await sendContactNotification({ name, email, message });
    } catch (mailError) {
      console.error("[mail] failed to send notification:", mailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Thanks for reaching out. Your message has been received.",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

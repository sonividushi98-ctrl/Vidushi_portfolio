import { useState } from "react";
import { apiBase } from "../data/portfolioData.js";
import { useToast } from "../context/ToastContext.jsx";

const empty = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2 || values.name.trim().length > 80) {
    errors.name = "Name must be between 2 and 80 characters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10 || values.message.trim().length > 2000) {
    errors.message = "Message must be between 10 and 2000 characters.";
  }
  return errors;
}

export default function ContactForm({ nameRef, onSuccess, rows = 6 } = {}) {
  const { showToast } = useToast();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  function onChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSending(true);
    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not send your message.");
      }
      showToast(data.message, "success");
      setValues(empty);
      setErrors({});
      onSuccess?.();
    } catch (error) {
      showToast(error.message || "Something went wrong. Please try again.", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input
          ref={nameRef}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={onChange}
          disabled={sending}
          required
          minLength={2}
          maxLength={80}
        />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          disabled={sending}
          required
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={rows}
          value={values.message}
          onChange={onChange}
          disabled={sending}
          required
          minLength={10}
          maxLength={2000}
        />
        {errors.message ? (
          <span className="field-error">{errors.message}</span>
        ) : null}
      </label>
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

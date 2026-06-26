import { useState } from "react";
import { Button, Card, TextInput, Textarea } from "@mantine/core";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// This is a Web3Forms public access key.
// It is safe to use in client-side code and in a public repository.
const WEB3FORMS_ACCESS_KEY = "81223e7a-2c17-4341-ac4f-770e6367e33b";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    try {
      setIsSending(true);
      setStatus({ type: "", message: "" });

      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("subject", "New message from Weather App");
      payload.append("from_name", "Weather App Contact Form");
      payload.append("name", cleanName);
      payload.append("email", cleanEmail);
      payload.append("message", cleanMessage);
      payload.append("botcheck", formData.botcheck);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Message could not be sent.");
      }

      setFormData({ name: "", email: "", message: "", botcheck: "" });
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-page">
      <Card className="page-card contact-card" radius="xl" padding="xl">
        <div>
          <p className="page-eyebrow">Contact</p>
          <h1 className="page-title">Send a message</h1>
          <p className="page-intro">
            Send feedback, questions, or ideas for improving the weather app.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="checkbox"
            name="botcheck"
            className="botcheck"
            checked={Boolean(formData.botcheck)}
            onChange={(event) =>
              updateField("botcheck", event.target.checked ? "true" : "")
            }
            tabIndex="-1"
            autoComplete="off"
          />

          <TextInput
            label="Name"
            placeholder="Your name"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="contact-input"
            size="md"
            required
          />

          <TextInput
            label="Email"
            placeholder="your.email@example.com"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="contact-input"
            size="md"
            required
          />

          <Textarea
            label="Message"
            placeholder="Write your message..."
            minRows={5}
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="contact-input"
            size="md"
            required
          />

          {status.message && (
            <p className={`form-status form-status-${status.type}`}>
              {status.message}
            </p>
          )}

          <Button
            type="submit"
            className="glass-button contact-submit"
            size="md"
            variant="default"
            loading={isSending}
          >
            Send message
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default ContactPage;

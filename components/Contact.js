"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, MessageCircle } from "lucide-react";
import { addMessage, getProfile } from "@/app/actions/portfolio";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const socials = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      href: profile?.displayEmail ? `mailto:${profile.displayEmail}` : null,
      value: profile?.displayEmail || null,
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      href: profile?.linkedinUrl || null,
      value: profile?.linkedinUrl || null,
    },
    {
      icon: <Github size={24} />,
      label: "GitHub",
      href: profile?.githubUrl || null,
      value: profile?.githubUrl || null,
    },
    {
      icon: <Twitter size={24} />,
      label: "Twitter",
      href: profile?.twitterUrl || null,
      value: profile?.twitterUrl || null,
    },
    {
      icon: <MessageCircle size={24} />,
      label: "WhatsApp",
      href: profile?.whatsappNumber
        ? `https://wa.me/${profile.whatsappNumber.replace(/\D/g, "")}`
        : null,
      value: profile?.whatsappNumber || null,
    },
  ].filter((s) => s.href && s.href !== "#" && s.href !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const res = await addMessage(formData);

    if (res.success) {
      setStatusMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatusMessage("Failed to send message: " + res.error);
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="contact-section"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        className="max-width-container contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "80px",
          width: "100%",
        }}
      >
        {/* Left Side: Information & Socials */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              color: "var(--primary)",
              fontWeight: 800,
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            Get in Touch
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              marginBottom: "30px",
              color: "white",
            }}
          >
            Contact <span className="gradient-text">Me.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            I am currently open for new opportunities and collaborations. If you
            have a project in mind or just want to say hi, feel free to reach
            out via the form or social media!
          </p>

          <div
            className="social-links"
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.label === "Email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ x: 10, color: "var(--primary)" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  transition: "0.3s color",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "var(--card-bg)",
                    border: "1.2px solid var(--border-line)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {social.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    {social.label}
                  </span>
                  {social.value && (
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--secondary-text)",
                        marginTop: "2px",
                      }}
                    >
                      {social.value.includes("//")
                        ? social.value.split("//")[1]
                        : social.value}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: "var(--card-bg)",
            padding: "50px",
            borderRadius: "30px",
            border: "2px solid var(--border-line)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <label
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span style={{ fontWeight: 600, color: "var(--secondary-text)" }}>
                Your Name
              </span>
              <input
                type="text"
                placeholder="What's your name?"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                style={{
                  background: "var(--background)",
                  border: "1.2px solid var(--border-line)",
                  padding: "18px 24px",
                  borderRadius: "15px",
                  color: "white",
                  outline: "none",
                  fontSize: "1rem",
                }}
              />
            </label>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span style={{ fontWeight: 600, color: "var(--secondary-text)" }}>
                Your Email
              </span>
              <input
                type="email"
                placeholder="What's your email?"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                style={{
                  background: "var(--background)",
                  border: "1.2px solid var(--border-line)",
                  padding: "18px 24px",
                  borderRadius: "15px",
                  color: "white",
                  outline: "none",
                  fontSize: "1rem",
                }}
              />
            </label>
            <label
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span style={{ fontWeight: 600, color: "var(--secondary-text)" }}>
                Your Message
              </span>
              <textarea
                rows="6"
                placeholder="What do you want to say?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                style={{
                  background: "var(--background)",
                  border: "1.2px solid var(--border-line)",
                  padding: "18px 24px",
                  borderRadius: "15px",
                  color: "white",
                  outline: "none",
                  fontSize: "1rem",
                  resize: "none",
                }}
              />
            </label>

            {statusMessage && (
              <p
                style={{
                  color: statusMessage.includes("success")
                    ? "var(--primary)"
                    : "red",
                  fontWeight: 600,
                }}
              >
                {statusMessage}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{
                scale: isSubmitting ? 1 : 1.05,
                boxShadow: isSubmitting
                  ? "none"
                  : "0 10px 20px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              style={{
                background: "var(--primary)",
                padding: "18px 45px",
                borderRadius: "12px",
                border: "none",
                color: "white",
                fontWeight: "bold",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "1rem",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            gap: 50px !important;
          }
          .contact-section {
            padding: 80px 20px !important;
          }
          .contact-form-container {
            padding: 25px !important;
          }
        }
      `}</style>
    </section>
  );
}

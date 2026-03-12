"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { getProfile } from "@/app/actions/portfolio";

export default function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const links = [
    { label: "LinkedIn", href: profile?.linkedinUrl },
    { label: "GitHub", href: profile?.githubUrl },
    { label: "Twitter", href: profile?.twitterUrl },
    {
      label: "WhatsApp",
      href: profile?.whatsappNumber
        ? `https://wa.me/${profile.whatsappNumber.replace(/\D/g, "")}`
        : null,
    },
  ].filter((l) => l.href && l.href !== "#" && l.href !== "");

  return (
    <footer
      className="footer"
      style={{
        padding: "60px 10%",
        textAlign: "center",
        fontSize: "1rem",
        color: "var(--secondary-text)",
        borderTop: "1.5px solid var(--border-line)",
        background: "var(--background)",
        position: "relative",
      }}
    >
      <div
        className="footer-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div className="footer-info" style={{ textAlign: "left" }}>
          <h3 style={{ color: "white", marginBottom: "10px", fontWeight: 800 }}>
            {profile?.userName || "Ahsan Ali"}
          </h3>
          <p style={{ fontSize: "0.9rem" }}>
            Designing the future, one pixel at a time.
          </p>
        </div>

        <div className="footer-links" style={{ display: "flex", gap: "25px" }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{
                transition: "0.3s color",
                color: "var(--secondary-text)",
              }}
              onMouseOver={(e) => (e.target.style.color = "var(--primary)")}
              onMouseOut={(e) =>
                (e.target.style.color = "var(--secondary-text)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{
            scale: 1.1,
            backgroundColor: "var(--primary)",
            color: "white",
          }}
          className="scroll-top-btn"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "12px",
            background: "var(--card-bg)",
            border: "1px solid var(--border-line)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>

      <div style={{ marginTop: "40px", fontSize: "0.85rem", opacity: 0.6 }}>
        © {new Date().getFullYear()} {profile?.userName || "Ahsan Ali"}. All
        Rights Reserved.
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer {
            padding: 40px 20px !important;
          }
          .footer-container {
            flex-direction: column !important;
            text-align: center;
          }
          .footer-info {
            text-align: center !important;
          }
          .footer-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}

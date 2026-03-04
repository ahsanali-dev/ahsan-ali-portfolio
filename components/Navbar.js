"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const nameParts = (profile?.userName || "Ahsan Ali").split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Dynamic Active Section Tracking
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when section hits middle of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const link = navLinks.find((l) => l.href === `#${id}`);
          if (link) {
            setActiveTab(link.name);
          }
        }
      });
    }, observerOptions);

    // Initial check for sections already in view
    setTimeout(() => {
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) observer.observe(section);
      });
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        transition: "all 0.3s ease",
        padding: scrolled ? "15px 10%" : "25px 10%",
        background: scrolled ? "rgba(15, 23, 42, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-line)" : "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          cursor: "pointer",
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "white",
        }}
      >
        {firstName} <span style={{ color: "var(--primary)" }}>{lastName}</span>
      </motion.div>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveTab(link.name)}
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color:
                  activeTab === link.name ? "white" : "var(--secondary-text)",
                position: "relative",
                transition: "0.3s color",
              }}
            >
              {link.name}
              {activeTab === link.name && (
                <motion.div
                  layoutId="activeUnderline"
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "var(--primary)",
                    borderRadius: "2px",
                  }}
                />
              )}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "10px 24px",
            background: "var(--primary)",
            color: "white",
            fontWeight: 700,
            borderRadius: "10px",
            fontSize: "0.9rem",
          }}
        >
          Hire Me
        </motion.a>
      </div>
    </nav>
  );
}

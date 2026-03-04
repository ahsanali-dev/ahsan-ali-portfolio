"use client";

import { motion } from "framer-motion";

export default function ExperienceClient({ experiences }) {
  return (
    <section id="experience">
      <div className="max-width-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "80px" }}
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
            My Career Path
          </p>
          <h2 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900 }}>
            Work <span className="gradient-text">Experience.</span>
          </h2>
        </motion.div>

        <div
          style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}
        >
          {/* Timeline Line */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: 0,
              bottom: 0,
              width: "4px",
              background: "var(--hover-glow)",
              opacity: 0.6,
              borderRadius: "2px",
            }}
          />

          {experiences.map((exp, i) => {
            const bullets = exp.achievements
              ? exp.achievements.split("\n").filter(Boolean)
              : [];

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                style={{
                  background: "var(--card-bg)",
                  marginLeft: "60px",
                  marginBottom: "50px",
                  padding: "40px",
                  borderRadius: "25px",
                  border: "1.5px solid var(--border-line)",
                  position: "relative",
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-52px",
                    top: "45px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--hover-glow)",
                    boxShadow: "0 0 15px var(--hover-glow)",
                    zIndex: 2,
                    border: "4px solid var(--background)",
                  }}
                />

                {/* Company Logo */}
                {exp.logo && (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "20px",
                      border: "1px solid var(--border-line)",
                    }}
                  >
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <h3
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {exp.role}
                </h3>
                <p
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginBottom: "25px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {exp.company} |{" "}
                  <span
                    style={{
                      color: "var(--secondary-text)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {exp.period}
                  </span>
                </p>

                <ul
                  style={{
                    paddingLeft: "20px",
                    color: "var(--secondary-text)",
                    fontSize: "1.05rem",
                  }}
                >
                  {bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: "12px", lineHeight: 1.6 }}
                    >
                      {bullet.replace(/^•\s*/, "")}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github as GithubIcon } from "lucide-react";

export default function ProjectsClient({ projects }) {
  return (
    <section id="projects" className="projects-section">
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
            My Work
          </p>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}>
            Featured <span className="gradient-text">Projects.</span>
          </h2>
        </motion.div>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
          }}
        >
          {projects.map((proj, i) => {
            const tags = proj.techStack
              ? proj.techStack.split(",").map((t) => t.trim())
              : [];
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
                viewport={{ once: true }}
                style={{
                  background: "var(--card-bg)",
                  borderRadius: "25px",
                  overflow: "hidden",
                  border: "1.5px solid var(--border-line)",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s",
                }}
              >
                {/* Project Image */}
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {proj.thumbnail ? (
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(34,211,238,0.1))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--secondary-text)",
                        fontSize: "3rem",
                      }}
                    >
                      🚀
                    </div>
                  )}
                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(10,15,30,0.8), transparent)",
                    }}
                  />
                </div>

                {/* Project Info */}
                <div className="project-info" style={{ padding: "30px" }}>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      marginBottom: "12px",
                    }}
                  >
                    {proj.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--secondary-text)",
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      marginBottom: "20px",
                    }}
                  >
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginBottom: "25px",
                    }}
                  >
                    {tags.map((tag, j) => (
                      <span
                        key={j}
                        style={{
                          padding: "5px 14px",
                          background: "rgba(59,130,246,0.1)",
                          color: "var(--primary)",
                          borderRadius: "50px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          border: "1px solid rgba(59,130,246,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div
                    className="project-links"
                    style={{ display: "flex", gap: "15px" }}
                  >
                    {proj.githubLink && proj.githubLink !== "#" && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 20px",
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "12px",
                          color: "white",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          border: "1px solid var(--border-line)",
                          transition: "0.3s",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <GithubIcon size={16} /> Code
                      </a>
                    )}
                    {proj.liveLink && proj.liveLink !== "#" && (
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn primary"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 20px",
                          background: "var(--accent-gradient)",
                          borderRadius: "12px",
                          color: "white",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          transition: "0.3s",
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 25px !important;
          }
          .projects-section {
            padding: 80px 20px !important;
          }
          .project-info {
            padding: 20px !important;
          }
          .project-links {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}

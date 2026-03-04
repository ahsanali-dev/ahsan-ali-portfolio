"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Database, Cpu, Layers, Terminal } from "lucide-react";

const getCategoryIcon = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes("front") || cat.includes("web")) return <Layout size={24} />;
  if (cat.includes("back") || cat.includes("db") || cat.includes("database"))
    return <Database size={24} />;
  if (cat.includes("design") || cat.includes("ui")) return <Layers size={24} />;
  if (cat.includes("tool") || cat.includes("git"))
    return <Terminal size={24} />;
  if (cat.includes("tech") || cat.includes("core")) return <Cpu size={24} />;
  return <Code2 size={24} />;
};

const getCategoryColor = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes("front")) return "#3b82f6"; // Blue
  if (cat.includes("back") || cat.includes("db")) return "#10b981"; // Green
  if (cat.includes("design")) return "#8b5cf6"; // Purple
  if (cat.includes("tool")) return "#f59e0b"; // Orange
  return "var(--primary)";
};

export default function SkillsClient({ skills }) {
  return (
    <section
      id="skills"
      style={{
        position: "relative",
        padding: "120px 10%",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)",
          zIndex: -1,
        }}
      />

      <div className="max-width-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            style={{
              color: "var(--primary)",
              fontWeight: 800,
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              marginBottom: "15px",
            }}
          >
            My Expertise
          </motion.p>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Technical <span className="gradient-text">Mastery.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "35px",
          }}
        >
          {skills.map((skillGroup, i) => {
            const color = getCategoryColor(skillGroup.category);
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{
                  background: "rgba(30, 41, 59, 0.4)",
                  backdropFilter: "blur(12px)",
                  padding: "25px",
                  borderRadius: "30px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow Effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "150px",
                    height: "150px",
                    background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                    zIndex: 0,
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "30px",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "14px",
                        background: `${color}15`,
                        color: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 8px 20px ${color}10`,
                      }}
                    >
                      {getCategoryIcon(skillGroup.category)}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: 800,
                        color: "#f8fafc",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {skillGroup.category}
                    </h3>
                  </div>

                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                  >
                    {skillGroup.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + idx * 0.05 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: `${color}25`,
                          color: "#fff",
                          borderColor: color,
                        }}
                        style={{
                          padding: "8px 18px",
                          background: "rgba(15, 23, 42, 0.5)",
                          borderRadius: "12px",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "var(--secondary-text)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Border Accent Line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "10%",
                    width: "80%",
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
                    opacity: 0.5,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

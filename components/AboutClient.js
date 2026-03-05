"use client";

import { motion } from "framer-motion";

export default function AboutClient({ profile }) {
  const desc =
    profile?.about ||
    "I turn vision into reality with code. Passionate frontend developer and MERN stack certified professional, specializing in creating engaging and user-friendly web experiences with React.js and Next.js.";

  const displayStats = [
    { label: "Years Experience", value: profile?.expYears || "0" },
    { label: "Projects Completed", value: profile?.projectsDone || "0" },
    { label: "Happy Clients", value: profile?.happyClients || "0" },
  ];

  return (
    <section
      id="about"
      style={{
        background: "var(--section-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="max-width-container about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* Left: Image / Placeholder */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{
            opacity: 1,
            x: 0,
            borderRadius: [
              "30% 60% 70% 30% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 30% / 50% 60% 30% 60%",
            ],
          }}
          transition={{
            x: { duration: 0.8 },
            borderRadius: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          viewport={{ once: true }}
          style={{
            width: "clamp(250px, 80vw, 400px)",
            height: "clamp(250px, 80vw, 400px)",
            background: "var(--card-bg)",
            overflow: "hidden",
            border: "1px solid var(--border-line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            margin: "0 auto",
          }}
        >
          {profile?.aboutImage ? (
            <img
              src={profile.aboutImage}
              alt="About"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "📷"
          )}
        </motion.div>

        {/* Right: Bio & Stats */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            style={{
              color: "var(--primary)",
              fontWeight: 800,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            About Me
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              marginBottom: "25px",
            }}
          >
            Transforming Ideas <br /> Into{" "}
            <span className="gradient-text">Reality.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "var(--secondary-text)",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            {desc}
          </p>

          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "20px",
            }}
          >
            {displayStats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                }}
                style={{
                  background: "var(--card-bg)",
                  padding: "25px",
                  borderRadius: "15px",
                  border: "1px solid var(--border-line)",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "var(--primary)",
                  }}
                >
                  {stat.value} +
                </h4>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--secondary-text)",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            gap: 50px !important;
            text-align: center;
          }
          .about-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}

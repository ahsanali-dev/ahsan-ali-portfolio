"use client";

import { motion } from "framer-motion";

export default function HeroClient({ profile }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const userName = profile?.userName || "Ahsan Ali";
  const headline =
    profile?.headline || "Frontend Developer & React/Next.js Expert.";
  const headlineParts = headline.split("&");
  const desc =
    profile?.about ||
    "I turn vision into reality with code. Passionate frontend developer specializing in creating engaging web experiences with React.js and Next.js.";

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        paddingTop: "var(--nav-height)",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
        paddingLeft: "10%",
      }}
    >
      <div className="hero-content" style={{ flex: 1, zIndex: 10 }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            style={{
              color: "var(--primary)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: 600,
              letterSpacing: "2px",
              marginBottom: "15px",
            }}
          >
            Hi, I'm {userName}
          </motion.p>
          <motion.h1
            variants={item}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              lineHeight: 1.1,
              marginBottom: "20px",
              fontWeight: 800,
              color: "white",
            }}
          >
            {headlineParts[0]} <span className="gradient-text">Developer</span>{" "}
            <br />
            {headlineParts.length > 1 ? `& ${headlineParts[1]}` : ""}
          </motion.h1>
          <motion.p
            variants={item}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "var(--secondary-text)",
              maxWidth: "600px",
              lineHeight: 1.6,
              marginBottom: "40px",
            }}
          >
            {desc}
          </motion.p>
          <motion.div
            variants={item}
            className="hero-btns"
            style={{ display: "flex", gap: "20px" }}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#work"
              style={{
                padding: "16px 36px",
                fontWeight: "700",
                color: "white",
                background: "var(--primary)",
                borderRadius: "12px",
                fontSize: "1rem",
                boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)",
              }}
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.05,
                background: "rgba(59, 130, 246, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              href="Ahsan-Ali.pdf"
              download
              style={{
                padding: "16px 36px",
                fontWeight: "700",
                color: "var(--primary)",
                border: "2.5px solid var(--primary)",
                borderRadius: "12px",
                fontSize: "1rem",
              }}
            >
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <div
        className="hero-image-container"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          style={{
            width: "clamp(250px, 40vw, 450px)",
            height: "clamp(250px, 40vw, 450px)",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(30px)",
            position: "absolute",
          }}
        />
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 30% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "clamp(200px, 35vw, 400px)",
            height: "clamp(200px, 35vw, 400px)",
            background: "var(--card-bg)",
            border: "2px solid var(--border-line)",
            zIndex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "6rem",
            color: "var(--primary)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          {profile?.profileImage ? (
            <img
              src={profile.profileImage}
              alt={userName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "👨‍💻"
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .hero-section {
            flex-direction: column !important;
            padding: 120px 5% 60px 5% !important;
            text-align: center;
          }
          .hero-content {
            order: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-image-container {
            order: 1;
            margin-bottom: 50px;
          }
          .hero-btns {
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .hero-btns {
            flex-direction: column;
            width: 100%;
          }
          .hero-btns a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}

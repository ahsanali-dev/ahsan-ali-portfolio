"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
        color: "white",
        textAlign: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Ghost
            size={100}
            color="var(--primary)"
            style={{ marginBottom: "20px" }}
          />
          <h1
            style={{
              fontSize: "clamp(6rem, 15vw, 10rem)",
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: "10px",
              letterSpacing: "-5px",
            }}
          >
            4<span className="gradient-text">0</span>4
          </h1>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Lost in <span className="gradient-text">Space?</span>
          </h2>
          <p
            style={{
              color: "var(--secondary-text)",
              fontSize: "1.2rem",
              maxWidth: "500px",
              margin: "0 auto 40px auto",
              lineHeight: 1.6,
            }}
          >
            The page you are looking for has floated away into the digital void.
            Don't worry, even the best astronauts get lost sometimes.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: "flex", gap: "20px", justifyContent: "center" }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--primary)",
              color: "white",
              padding: "15px 30px",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "1rem",
              transition: "0.3s transform",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Home size={20} /> Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "transparent",
              color: "white",
              padding: "15px 30px",
              borderRadius: "12px",
              border: "1px solid var(--border-line)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s background",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "var(--card-bg)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </motion.div>
      </div>

      {/* Floating particles decoration */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 - 50 + "vw",
            y: Math.random() * 100 - 50 + "vh",
            opacity: Math.random(),
          }}
          animate={{
            y: [null, Math.random() * 100 - 50 + "vh"],
            x: [null, Math.random() * 100 - 50 + "vw"],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: "2px",
            height: "2px",
            background: "white",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
}

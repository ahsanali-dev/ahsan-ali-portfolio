"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LogIn,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateAdmin } from "@/app/actions/portfolio";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await validateAdmin(formData.username, formData.password);

      if (result.success) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/admin");
      } else {
        alert(result.error || "Invalid Credentials!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glows */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "min(400px, 80vw)",
          height: "min(400px, 80vw)",
          background: "var(--primary)",
          filter: "blur(150px)",
          opacity: 0.15,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "min(400px, 80vw)",
          height: "min(400px, 80vw)",
          background: "var(--hover-glow)",
          filter: "blur(150px)",
          opacity: 0.1,
          borderRadius: "50%",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(30, 41, 59, 0.7)",
          backdropFilter: "blur(15px)",
          border: "1.5px solid var(--border-line)",
          borderRadius: "30px",
          padding: "clamp(20px, 5vw, 50px)",
          textAlign: "center",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--secondary-text)",
            fontSize: "0.9rem",
            marginBottom: "30px",
            textDecoration: "none",
            transition: "0.3s",
          }}
        >
          <ArrowLeft size={16} /> Back to Site
        </Link>

        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              background: "var(--accent-gradient)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
            }}
          >
            <Lock size={32} color="white" />
          </div>
          <h1
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: 900 }}
          >
            Admin <span className="gradient-text">Portal</span>
          </h1>
          <p
            style={{
              color: "var(--secondary-text)",
              marginTop: "10px",
              fontSize: "0.9rem",
            }}
          >
            Enter your credentials to manage portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--secondary-text)",
              }}
            >
              Username
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={18}
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--secondary-text)",
                }}
              />
              <input
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 15px 14px 45px",
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "1.5px solid var(--border-line)",
                  borderRadius: "15px",
                  color: "white",
                  outline: "none",
                  transition: "0.3s",
                  opacity: loading ? 0.7 : 1,
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--secondary-text)",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--secondary-text)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 45px 14px 45px",
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "1.5px solid var(--border-line)",
                  borderRadius: "15px",
                  color: "white",
                  outline: "none",
                  transition: "0.3s",
                  opacity: loading ? 0.7 : 1,
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--secondary-text)",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              background: "var(--accent-gradient)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              fontSize: "1.1rem",
              fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "0.3s",
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <>
                <Loader
                  size={20}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={20} /> Sign In
              </>
            )}
          </button>
        </form>
      </motion.div>

      <style jsx global>{`
        input:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
}

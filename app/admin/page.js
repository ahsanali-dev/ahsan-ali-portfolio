"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Code2,
  FolderPlus,
  Settings,
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  X,
  PlusCircle,
  FileText,
  Calendar,
  Layers,
  LogOut,
  Edit2,
  Github,
  User,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader,
  Mail,
} from "lucide-react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getSkills,
  addSkill,
  deleteSkill,
  getProfile,
  updateProfile,
  getMessages,
  deleteMessage,
} from "@/app/actions/portfolio";

// ─── Toast Notification ────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 9999,
        background:
          type === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
        border: `1.5px solid ${type === "success" ? "#22c55e" : "#ef4444"}`,
        borderRadius: "15px",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backdropFilter: "blur(10px)",
        color: "white",
        fontWeight: 600,
      }}
    >
      {type === "success" ? (
        <CheckCircle size={20} color="#22c55e" />
      ) : (
        <AlertCircle size={20} color="#ef4444" />
      )}
      {message}
    </motion.div>
  );
}

// ─── Confirmation Modal ──────────────────────────────────────────
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
            }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            style={{
              width: "100%",
              maxWidth: "400px",
              background: "var(--section-bg)",
              borderRadius: "24px",
              border: "1.5px solid var(--border-line)",
              padding: "30px",
              position: "relative",
              zIndex: 10001,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(239,68,68,0.1)",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Trash2 size={30} />
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                marginBottom: "10px",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                color: "var(--secondary-text)",
                marginBottom: "30px",
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                onClick={onCancel}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1.5px solid var(--border-line)",
                  background: "transparent",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Image Upload Component ─────────────────────────────────────
function ImageUpload({ label, onImageChange, currentImage }) {
  const [preview, setPreview] = useState(currentImage || null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setPreview(null);
    onImageChange(null);
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <ImageIcon size={16} /> {label}
      </label>
      {!preview ? (
        <div
          onClick={() => document.getElementById(`file-input-${label}`).click()}
          style={{
            width: "100%",
            height: "150px",
            border: "2px dashed var(--border-line)",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "0.3s",
            background: "rgba(15, 23, 42, 0.3)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.borderColor = "var(--primary)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.borderColor = "var(--border-line)")
          }
        >
          <Plus size={30} color="var(--secondary-text)" />
          <p
            style={{
              color: "var(--secondary-text)",
              fontSize: "0.9rem",
              marginTop: "10px",
            }}
          >
            Click to upload image
          </p>
          <input
            id={`file-input-${label}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "200px",
              borderRadius: "15px",
              border: "1.5px solid var(--border-line)",
              objectFit: "cover",
            }}
          />
          <button
            onClick={removeImage}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Dashboard ───────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const showToast = (message, type = "success") => setToast({ message, type });
  const triggerRefresh = () => setRefresh((r) => r + 1);

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderPlus },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "messages", label: "Messages", icon: Mail },
  ];

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    triggerRefresh();
  };

  const openConfirm = (title, message, onConfirm) => {
    setConfirmData({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmData((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        .ui-switch {
          --switch-width: 48px;
          --switch-height: 24px;
          --circle-size: 18px;
          --circle-offset: 3px;
          position: relative;
          display: inline-block;
          width: var(--switch-width);
          height: var(--switch-height);
          cursor: pointer;
          vertical-align: middle;
        }
        
        .ui-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
        
        .ui-switch .slider {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255,255,255,0.1);
          transition: .4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 34px;
          border: 1.5px solid var(--border-line);
        }
        
        .ui-switch .circle {
          position: absolute;
          height: var(--circle-size);
          width: var(--circle-size);
          left: var(--circle-offset);
          top: calc(50% - var(--circle-size)/2);
          background-color: white;
          transition: .4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .ui-switch input:checked + .slider {
          background-color: var(--primary);
          border-color: var(--primary);
        }
        
        .ui-switch input:checked + .slider .circle {
          transform: translateX(calc(var(--switch-width) - var(--circle-size) - (var(--circle-offset) * 2)));
        }
      `}</style>
      {/* Mobile Header */}
      <div className="mobile-header">
        <h2 style={{ fontSize: "1.2rem", fontWeight: 900, margin: 0 }}>
          Ahsan <span className="gradient-text">Admin</span>
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: "none", border: "none", color: "white" }}
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div
                style={{ width: "25px", height: "2px", background: "white" }}
              />
              <div
                style={{ width: "25px", height: "2px", background: "white" }}
              />
              <div
                style={{ width: "25px", height: "2px", background: "white" }}
              />
            </div>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}
        style={{
          width: "280px",
          background: "var(--section-bg)",
          borderRight: "1.5px solid var(--border-line)",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
          zIndex: 100,
          transition: "0.3s ease-in-out",
        }}
      >
        <div style={{ marginBottom: "50px", padding: "0 10px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900 }}>
            Ahsan <span className="gradient-text">Admin</span>
          </h1>
          <p style={{ color: "var(--secondary-text)", fontSize: "0.9rem" }}>
            Portfolio Management
          </p>
        </div>
        <nav style={{ flex: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="nav-btn"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "14px 20px",
                  border: "none",
                  background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--secondary-text)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  transition: "0.3s",
                  fontSize: "1rem",
                  fontWeight: isActive ? 700 : 500,
                  borderLeft: isActive
                    ? "4px solid var(--primary)"
                    : "4px solid transparent",
                }}
              >
                <Icon size={20} /> {item.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "14px 20px",
            border: "none",
            background: "transparent",
            color: "#ff4b4b",
            cursor: "pointer",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main
        className="main-content"
        style={{ flex: 1, padding: "50px", transition: "0.3s" }}
      >
        {isCheckingAuth ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Loader size={40} className="animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + refresh}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && (
                <OverviewView showToast={showToast} />
              )}
              {activeTab === "projects" && (
                <ProjectsView
                  onAdd={() => openModal("project")}
                  onEdit={(proj) => openModal("project", proj)}
                  openConfirm={openConfirm}
                  showToast={showToast}
                  refresh={refresh}
                />
              )}
              {activeTab === "experience" && (
                <ExperienceView
                  onAdd={() => openModal("experience")}
                  onEdit={(exp) => openModal("experience", exp)}
                  openConfirm={openConfirm}
                  showToast={showToast}
                  refresh={refresh}
                />
              )}
              {activeTab === "skills" && (
                <SkillsView
                  onAdd={() => openModal("skill")}
                  showToast={showToast}
                  refresh={refresh}
                />
              )}
              {activeTab === "messages" && (
                <MessagesView
                  showToast={showToast}
                  refresh={refresh}
                  openConfirm={openConfirm}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(5px)",
              }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="modal-container"
              style={{
                width: "100%",
                maxWidth: "650px",
                background: "var(--section-bg)",
                borderRadius: "30px",
                border: "1.5px solid var(--border-line)",
                padding: "40px",
                position: "relative",
                zIndex: 201,
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: "absolute",
                  right: "25px",
                  top: "25px",
                  background: "none",
                  border: "none",
                  color: "var(--secondary-text)",
                  cursor: "pointer",
                }}
              >
                <X size={24} />
              </button>
              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800 }}>
                  {editingItem ? "Edit" : "Add New"}{" "}
                  <span className="gradient-text">
                    {modalType === "project"
                      ? "Project"
                      : modalType === "experience"
                        ? "Experience"
                        : "Skill"}
                  </span>
                </h2>
                <p style={{ color: "var(--secondary-text)" }}>
                  {editingItem
                    ? "Update your details below."
                    : "Fill in the details below to update your portfolio."}
                </p>
              </div>
              {modalType === "project" && (
                <ProjectForm
                  initialData={editingItem}
                  onSave={closeModal}
                  showToast={showToast}
                />
              )}
              {modalType === "experience" && (
                <ExperienceForm
                  initialData={editingItem}
                  onSave={closeModal}
                  showToast={showToast}
                />
              )}
              {modalType === "skill" && (
                <SkillForm onSave={closeModal} showToast={showToast} />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmData.isOpen}
        title={confirmData.title}
        message={confirmData.message}
        onConfirm={confirmData.onConfirm}
        onCancel={() => setConfirmData((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: var(--section-bg);
          border-bottom: 1px solid var(--border-line);
          padding: 0 20px;
          align-items: center;
          justify-content: space-between;
          z-index: 90;
        }
        .main-content {
          margin-left: 280px;
        }
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            margin-left: 0 !important;
            padding: 100px 20px 40px !important;
          }
          .mobile-header {
            display: flex;
          }
          .modal-container {
            padding: 30px 20px !important;
          }
          .grid-2-col {
            grid-template-columns: 1fr !important;
          }
          h2 {
            font-size: 2rem !important;
          }
          .admin-card {
            padding: 20px !important;
          }
        }
        input,
        textarea,
        select {
          width: 100%;
          padding: 14px 18px;
          background: rgba(15, 23, 42, 0.5);
          border: 1.5px solid var(--border-line);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          margin-top: 8px;
          outline: none;
          transition: 0.3s;
          box-sizing: border-box;
        }
        input:focus,
        textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
        }
        label {
          font-weight: 600;
          color: var(--secondary-text);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-card {
          background: var(--card-bg);
          border-radius: 20px;
          padding: 25px;
          border: 1.5px solid var(--border-line);
          margin-bottom: 25px;
          transition: 0.3s;
        }
        .admin-card:hover {
          border-color: rgba(59, 130, 246, 0.3);
        }
        .btn-primary {
          background: var(--accent-gradient);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.1);
        }
        .btn-primary:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}

// ─── Overview View ──────────────────────────────────────────────
function OverviewView({ showToast }) {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    projects: "—",
    experience: "—",
    clients: "—",
  });
  const [form, setForm] = useState({
    userName: "Ahsan Ali",
    headline: "Frontend Developer & React/Next.js Expert",
    about: "I turn vision into reality with code.",
    githubUrl: "https://github.com/ahsan-dev",
    linkedinUrl: "https://linkedin.com/in/ahsan-dev",
    twitterUrl: "",
    displayEmail: "",
    profileImage: null,
    aboutImage: null,
    expYears: "",
    projectsDone: "",
    happyClients: "",
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getProfile().then((p) => {
      if (p) {
        setProfile(p);
        setForm({
          userName: p.userName,
          headline: p.headline,
          about: p.about,
          githubUrl: p.githubUrl || "",
          linkedinUrl: p.linkedinUrl || "",
          twitterUrl: p.twitterUrl || "",
          displayEmail: p.displayEmail || "",
          profileImage: p.profileImage || null,
          aboutImage: p.aboutImage || null,
          expYears: p.expYears || "",
          projectsDone: p.projectsDone || "",
          happyClients: p.happyClients || "",
        });
        setStats({
          projects: p.projectsDone || "0",
          experience: p.expYears ? `${p.expYears} Yrs` : "0",
          clients: p.happyClients || "0",
        });
      }
    });
  }, []);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateProfile(form);
      if (result.success) {
        showToast("Profile updated successfully!");
        setStats({
          projects: form.projectsDone || "0",
          experience: form.expYears ? `${form.expYears} Yrs` : "0",
          clients: form.happyClients || "0",
        });
      } else showToast("Error updating profile", "error");
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "40px" }}>
        Dashboard <span className="gradient-text">Overview</span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          marginBottom: "40px",
        }}
      >
        {[
          {
            label: "Total Projects",
            icon: FolderPlus,
            color: "#3b82f6",
            value: stats.projects,
          },
          {
            label: "Years Experience",
            icon: Briefcase,
            color: "#22d3ee",
            value: stats.experience,
          },
          {
            label: "Happy Clients",
            icon: Settings,
            color: "#8b5cf6",
            value: stats.clients,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="admin-card"
            style={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "15px",
                background: `${stat.color}15`,
                color: stat.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <stat.icon size={28} />
            </div>
            <div>
              <p style={{ color: "var(--secondary-text)", fontSize: "0.9rem" }}>
                {stat.label}
              </p>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800 }}>
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: "25px", fontSize: "1.4rem" }}>
          Quick Profile Update
        </h3>
        <div
          className="grid-2-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
            marginBottom: "25px",
          }}
        >
          <ImageUpload
            label="Profile Picture"
            currentImage={form.profileImage}
            onImageChange={(img) =>
              setForm((f) => ({ ...f, profileImage: img }))
            }
          />
          <ImageUpload
            label="About Illustration"
            currentImage={form.aboutImage}
            onImageChange={(img) => setForm((f) => ({ ...f, aboutImage: img }))}
          />
        </div>
        <div
          className="grid-2-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          <div style={{ gridColumn: "span 2" }}>
            <label>
              <User size={16} /> User Name
            </label>
            <input
              type="text"
              value={form.userName}
              onChange={(e) =>
                setForm((f) => ({ ...f, userName: e.target.value }))
              }
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label>
              <FileText size={16} /> Headline
            </label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) =>
                setForm((f) => ({ ...f, headline: e.target.value }))
              }
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label>
              <Layers size={16} /> About Description
            </label>
            <textarea
              rows="4"
              value={form.about}
              onChange={(e) =>
                setForm((f) => ({ ...f, about: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: "25px", fontSize: "1.4rem" }}>
          Portfolio Statistics
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
          }}
        >
          <div>
            <label>Years of Exp.</label>
            <input
              type="text"
              value={form.expYears}
              onChange={(e) =>
                setForm((f) => ({ ...f, expYears: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Projects Done</label>
            <input
              type="text"
              value={form.projectsDone}
              onChange={(e) =>
                setForm((f) => ({ ...f, projectsDone: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Happy Clients</label>
            <input
              type="text"
              value={form.happyClients}
              onChange={(e) =>
                setForm((f) => ({ ...f, happyClients: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: "25px", fontSize: "1.4rem" }}>
          Social Presence
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          <div>
            <label>
              <Github size={16} /> GitHub URL
            </label>
            <input
              type="text"
              value={form.githubUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, githubUrl: e.target.value }))
              }
            />
          </div>
          <div>
            <label>
              <ExternalLink size={16} /> LinkedIn URL
            </label>
            <input
              type="text"
              value={form.linkedinUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, linkedinUrl: e.target.value }))
              }
            />
          </div>
          <div>
            <label>
              <ExternalLink size={16} /> Twitter URL
            </label>
            <input
              type="text"
              value={form.twitterUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, twitterUrl: e.target.value }))
              }
            />
          </div>
          <div>
            <label>
              <Mail size={16} /> Display Email
            </label>
            <input
              type="text"
              value={form.displayEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, displayEmail: e.target.value }))
              }
            />
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: "40px" }}
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? <Loader size={18} /> : <Save size={18} />}{" "}
          {isPending ? "Saving..." : "Sync with Portfolio"}
        </button>
      </div>
    </div>
  );
}

// ─── Projects View ──────────────────────────────────────────────
function ProjectsView({ onAdd, onEdit, openConfirm, showToast, refresh }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true);
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, [refresh]);

  const handleDelete = (id) => {
    openConfirm(
      "Delete Project?",
      "Are you sure you want to remove this project? This action cannot be undone.",
      async () => {
        startTransition(async () => {
          const result = await deleteProject(id);
          if (result.success) {
            setProjects((p) => p.filter((x) => x.id !== id));
            showToast("Project deleted!");
          } else showToast("Error deleting project", "error");
        });
      },
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h2 style={{ fontSize: "2.8rem", fontWeight: 900 }}>
          My <span className="gradient-text">Projects</span>
        </h2>
        <button className="btn-primary" onClick={onAdd}>
          <PlusCircle size={20} /> New Project
        </button>
      </div>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            color: "var(--secondary-text)",
          }}
        >
          <Loader size={40} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      ) : projects.length === 0 ? (
        <div
          className="admin-card"
          style={{ textAlign: "center", padding: "60px" }}
        >
          <FolderPlus
            size={50}
            color="var(--secondary-text)"
            style={{ marginBottom: "20px" }}
          />
          <p style={{ color: "var(--secondary-text)", fontSize: "1.1rem" }}>
            No projects yet. Click "New Project" to add one!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "25px",
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="admin-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "80px",
                    borderRadius: "15px",
                    background: "rgba(15,23,42,0.5)",
                    border: "1px solid var(--border-line)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
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
                    <ImageIcon color="var(--secondary-text)" size={32} />
                  )}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                    {proj.title}
                  </h4>
                  <p
                    style={{
                      color: "var(--secondary-text)",
                      fontSize: "0.9rem",
                      marginTop: "4px",
                    }}
                  >
                    {proj.techStack}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                <button
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "none",
                    color: "var(--primary)",
                    padding: "10px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => onEdit(proj)}
                >
                  <Edit2 size={18} />
                </button>
                <button
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "none",
                    color: "#ef4444",
                    padding: "10px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(proj.id)}
                  disabled={isPending}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        .ui-switch {
          --switch-width: 40px;
          --switch-height: 20px;
          --circle-size: 14px;
          --circle-offset: 3px;
          position: relative;
          display: inline-block;
          width: var(--switch-width);
          height: var(--switch-height);
        }
        
        .ui-switch input { opacity: 0; width: 0; height: 0; }
        
        .ui-switch .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255,255,255,0.1);
          transition: .4s;
          border-radius: 34px;
          border: 1px solid var(--border-line);
        }
        
        .ui-switch .circle {
          position: absolute;
          height: var(--circle-size);
          width: var(--circle-size);
          left: var(--circle-offset);
          bottom: var(--circle-offset);
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        .ui-switch input:checked + .slider {
          background-color: var(--primary);
          border-color: var(--primary);
        }
        
        .ui-switch input:checked + .slider .circle {
          transform: translateX(calc(var(--switch-width) - var(--circle-size) - (var(--circle-offset) * 2)));
        }
      `}</style>
    </div>
  );
}

// ─── Experience View ─────────────────────────────────────────────
function ExperienceView({ onAdd, onEdit, openConfirm, showToast, refresh }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true);
    getExperience().then((data) => {
      setExperiences(data);
      setLoading(false);
    });
  }, [refresh]);

  const handleDelete = (id) => {
    openConfirm(
      "Delete Experience?",
      "Are you sure you want to remove this work history entry?",
      async () => {
        startTransition(async () => {
          const result = await deleteExperience(id);
          if (result.success) {
            setExperiences((e) => e.filter((x) => x.id !== id));
            showToast("Experience deleted!");
          } else showToast("Error deleting experience", "error");
        });
      },
    );
  };

  return (
    <div>
      <style>{`
        .data-table-container { border: 1px solid var(--border-line); overflow: hidden; border-radius: 12px; margin-top: 20px; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { padding: 12px; background: rgba(255,255,255,0.02); color: var(--secondary-text); border-bottom: 1px solid var(--border-line); font-size: 0.8rem; text-align: left; }
        .admin-table td { padding: 12px; border-bottom: 1px solid var(--border-line); }
        .status-badge { padding: 3px 8px; border-radius: 10px; font-size: 0.7rem; font-weight: 700; }
        .status-badge.current { background: rgba(34,211,238,0.2); color: var(--hover-glow); }
        .status-badge.past { background: rgba(255,255,255,0.1); color: var(--secondary-text); }
      `}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h2 style={{ fontSize: "2.8rem", fontWeight: 900 }}>
          Career <span className="gradient-text">History</span>
        </h2>
        <button className="btn-primary" onClick={onAdd}>
          <PlusCircle size={20} /> Add Experience
        </button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <Loader size={40} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      ) : experiences.length === 0 ? (
        <div
          className="admin-card"
          style={{ textAlign: "center", padding: "60px" }}
        >
          <Briefcase
            size={50}
            color="var(--secondary-text)"
            style={{ marginBottom: "20px" }}
          />
          <p style={{ color: "var(--secondary-text)", fontSize: "1.1rem" }}>
            No experience added yet.
          </p>
        </div>
      ) : (
        <div className="data-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Period</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id}>
                  <td style={{ fontWeight: 700 }}>{exp.company}</td>
                  <td style={{ color: "var(--secondary-text)" }}>{exp.role}</td>
                  <td style={{ fontSize: "0.9rem" }}>{exp.period}</td>
                  <td>
                    <span
                      className={`status-badge ${exp.isCurrent ? "current" : "past"}`}
                    >
                      {exp.isCurrent ? "Current" : "Completed"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        onClick={() => onEdit(exp)}
                        style={{
                          background: "rgba(59,130,246,0.1)",
                          border: "none",
                          color: "var(--primary)",
                          padding: "8px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        disabled={isPending}
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "none",
                          color: "#ef4444",
                          padding: "8px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Skills View ─────────────────────────────────────────────────
function SkillsView({ onAdd, showToast, refresh }) {
  const [skills, setSkills] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getSkills().then((data) => setSkills(data));
  }, [refresh]);

  const handleDelete = (id) => {
    startTransition(async () => {
      const result = await deleteSkill(id);
      if (result.success) {
        setSkills((s) => s.filter((x) => x.id !== id));
        showToast("Skill removed!");
      } else showToast("Error removing skill", "error");
    });
  };

  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h2 style={{ fontSize: "2.8rem", fontWeight: 900 }}>
          Tech <span className="gradient-text">Skills</span>
        </h2>
        <button className="btn-primary" onClick={onAdd}>
          <PlusCircle size={20} /> Add Skill
        </button>
      </div>
      {Object.keys(grouped).length === 0 ? (
        <div
          className="admin-card"
          style={{ textAlign: "center", padding: "60px" }}
        >
          <Code2
            size={50}
            color="var(--secondary-text)"
            style={{ marginBottom: "20px" }}
          />
          <p style={{ color: "var(--secondary-text)", fontSize: "1.1rem" }}>
            No skills added yet.
          </p>
        </div>
      ) : (
        <div
          className="grid-2-col"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "30px",
          }}
        >
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="admin-card">
              <h3 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>
                {cat}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {items.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      padding: "8px 18px",
                      background: "rgba(59,130,246,0.1)",
                      color: "var(--primary)",
                      borderRadius: "50px",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {s.name}
                    <button
                      onClick={() => handleDelete(s.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "inherit",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                      }}
                      disabled={isPending}
                    >
                      <X size={14} style={{ opacity: 0.6 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Form Components ─────────────────────────────────────────────
function ProjectForm({ onSave, showToast, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      thumbnail: null,
      techStack: "",
      githubLink: "",
      liveLink: "",
      description: "",
    },
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!form.title || !form.techStack) {
      showToast("Title and Tech Stack are required!", "error");
      return;
    }
    startTransition(async () => {
      const result = initialData
        ? await updateProject(initialData.id, form)
        : await addProject(form);
      if (result.success) {
        showToast(initialData ? "Project updated! ✨" : "Project added! 🎉");
        onSave();
      } else showToast("Error saving project: " + result.error, "error");
    });
  };

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <div>
        <label>
          <FileText size={16} /> Project Title *
        </label>
        <input
          type="text"
          placeholder="e.g. Portfolio Website"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
      </div>
      <div>
        <label>
          <Layers size={16} /> Tech Stack * (Comma separated)
        </label>
        <input
          type="text"
          placeholder="React, Next.js, Framer Motion"
          value={form.techStack}
          onChange={(e) =>
            setForm((f) => ({ ...f, techStack: e.target.value }))
          }
        />
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div>
          <label>
            <Github size={16} /> GitHub Link
          </label>
          <input
            type="text"
            placeholder="https://github.com/..."
            value={form.githubLink}
            onChange={(e) =>
              setForm((f) => ({ ...f, githubLink: e.target.value }))
            }
          />
        </div>
        <div>
          <label>
            <ExternalLink size={16} /> Live Demo Link
          </label>
          <input
            type="text"
            placeholder="https://site.vercel.app"
            value={form.liveLink}
            onChange={(e) =>
              setForm((f) => ({ ...f, liveLink: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <label>
          <FileText size={16} /> Description
        </label>
        <textarea
          rows="4"
          placeholder="Describe your amazing project..."
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
        />
      </div>
      <div>
        <ImageUpload
          label="Project Thumbnail"
          currentImage={form.thumbnail}
          onImageChange={(img) => setForm((f) => ({ ...f, thumbnail: img }))}
        />
      </div>
      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={isPending}
        style={{ alignSelf: "flex-start" }}
      >
        {isPending ? <Loader size={18} /> : <Save size={18} />}{" "}
        {isPending
          ? "Saving..."
          : initialData
            ? "Update Project"
            : "Add Project to Portfolio"}
      </button>
    </div>
  );
}

function ExperienceForm({ onSave, showToast, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      company: "",
      role: "",
      period: "",
      achievements: "",
    },
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (initialData) {
      if (initialData.startDate) setStartDate(initialData.startDate);
      if (initialData.endDate) setEndDate(initialData.endDate);
      setIsCurrent(
        initialData.isCurrent || !!initialData.period?.includes("Present"),
      );
    }
  }, [initialData]);

  const formatPeriodDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const handleSubmit = () => {
    if (!form.company || !form.role || !startDate) {
      showToast("Company, Role and Start Date are required!", "error");
      return;
    }

    const startFormatted = formatPeriodDate(startDate);
    const endFormatted = isCurrent ? "Present" : formatPeriodDate(endDate);
    const periodString = `${startFormatted} - ${endFormatted}`;

    const submissionData = {
      ...form,
      period: periodString,
      startDate,
      endDate: isCurrent ? "" : endDate,
      isCurrent,
    };

    startTransition(async () => {
      const result = initialData
        ? await updateExperience(initialData.id, submissionData)
        : await addExperience(submissionData);
      if (result.success) {
        showToast(
          initialData ? "Experience updated! ✨" : "Experience added! 🎉",
        );
        onSave();
      } else showToast("Error saving experience: " + result.error, "error");
    });
  };

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <div
        className="grid-2-col"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div>
          <label>
            <Briefcase size={16} /> Company Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={form.company}
            onChange={(e) =>
              setForm((f) => ({ ...f, company: e.target.value }))
            }
          />
        </div>
        <div>
          <label>
            <User size={16} /> Your Role *
          </label>
          <input
            type="text"
            placeholder="Software Engineer"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          alignItems: "end",
        }}
      >
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={16} /> Start Date *
          </label>
          <input
            type="month"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "5px 10px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "10px",
              border: "1px solid var(--border-line)",
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              Current Position?
            </span>
            <label className="ui-switch">
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
              />
              <div className="slider">
                <div className="circle"></div>
              </div>
            </label>
          </div>
          {!isCurrent ? (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <input
                type="month"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          ) : (
            <div
              style={{
                height: "45px",
                display: "flex",
                alignItems: "center",
                padding: "0 15px",
                background: "rgba(34,211,238,0.05)",
                borderRadius: "12px",
                color: "var(--hover-glow)",
                fontSize: "0.9rem",
                fontWeight: 700,
                border: "1px dashed rgba(34,211,238,0.3)",
              }}
            >
              Working till Present
            </div>
          )}
        </div>
      </div>
      <div>
        <label>
          <FileText size={16} /> Key Achievements
        </label>
        <textarea
          rows="5"
          placeholder="• Developed X feature&#10;• Improved performance by Y%"
          value={form.achievements}
          onChange={(e) =>
            setForm((f) => ({ ...f, achievements: e.target.value }))
          }
        />
      </div>
      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={isPending}
        style={{ alignSelf: "flex-start" }}
      >
        {isPending ? <Loader size={18} /> : <PlusCircle size={18} />}{" "}
        {isPending
          ? "Saving..."
          : initialData
            ? "Update Experience"
            : "Save Experience"}
      </button>
    </div>
  );
}

function SkillForm({ onSave, showToast }) {
  const [form, setForm] = useState({ category: "Frontend", name: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!form.name) {
      showToast("Skill name is required!", "error");
      return;
    }
    startTransition(async () => {
      const result = await addSkill(form);
      if (result.success) {
        showToast("Skill added successfully! 🎉");
        onSave();
      } else showToast("Error adding skill: " + result.error, "error");
    });
  };

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <div>
        <label>
          <Layers size={16} /> Skill Category
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          <option>Frontend</option>
          <option>Backend & DB</option>
          <option>Design & Tools</option>
          <option>Mobile</option>
          <option>DevOps</option>
        </select>
      </div>
      <div>
        <label>
          <Code2 size={16} /> Skill Name *
        </label>
        <input
          type="text"
          placeholder="e.g. TypeScript"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>
      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={isPending}
        style={{ alignSelf: "flex-start" }}
      >
        {isPending ? <Loader size={18} /> : <PlusCircle size={18} />}{" "}
        {isPending ? "Saving..." : "Add Technical Skill"}
      </button>
    </div>
  );
}

function MessagesView({ showToast, refresh }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true);
    getMessages().then((data) => {
      setMessages(data);
      setLoading(false);
    });
  }, [refresh]);

  const handleDelete = (id) => {
    openConfirm(
      "Delete Message?",
      "Are you sure you want to delete this message forever?",
      async () => {
        startTransition(async () => {
          const result = await deleteMessage(id);
          if (result.success) {
            setMessages((m) => m.filter((x) => x.id !== id));
            showToast("Message deleted!");
          } else showToast("Error deleting message", "error");
        });
      },
    );
  };

  return (
    <div>
      <h2 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "40px" }}>
        User <span className="gradient-text">Messages</span>
      </h2>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            color: "var(--secondary-text)",
          }}
        >
          <Loader size={40} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      ) : messages.length === 0 ? (
        <div
          className="admin-card"
          style={{ textAlign: "center", padding: "60px" }}
        >
          <Mail
            size={50}
            color="var(--secondary-text)"
            style={{ marginBottom: "20px" }}
          />
          <p style={{ color: "var(--secondary-text)", fontSize: "1.1rem" }}>
            No messages received yet.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "25px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="admin-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                    {msg.name}
                  </h4>
                  <p
                    style={{
                      color: "var(--primary)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {msg.email}
                  </p>
                  <p
                    style={{
                      color: "var(--secondary-text)",
                      fontSize: "0.8rem",
                      marginTop: "4px",
                    }}
                  >
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "none",
                    color: "#ef4444",
                    padding: "10px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(msg.id)}
                  disabled={isPending}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.3)",
                  padding: "20px",
                  borderRadius: "12px",
                  lineHeight: 1.6,
                  color: "var(--secondary-text)",
                  border: "1px solid var(--border-line)",
                }}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

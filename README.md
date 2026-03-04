# 🚀 Creative Portfolio Website

A modern, high-performance, and visually stunning portfolio website designed for developers. This project features interactive 3D elements, smooth animations, and a comprehensive admin panel for seamless content management.

## ✨ Key Features

- **🎨 Immersive Design**: Integrated **Three.js** (via React Three Fiber) for dynamic 3D scenes and **Framer Motion** for fluid animations.
- **🛠️ Admin Dashboard**: A full-featured admin panel (`/admin`) to manage projects, skills, and work experience without touching the code.
- **⚡ Server-Side Power**: Leverages **Next.js Server Actions** and **Prisma ORM** for efficient, SEO-friendly data fetching and updates.
- **🗄️ Database Integration**: Persistent storage using **MySQL**, ensuring all portfolio data is dynamic and up-to-date.
- **📱 Fully Responsive**: Crafted with a mobile-first approach to look great on every screen size.
- **📩 Contact Integration**: Interactive contact form for potential clients or collaborators.
- **🖱️ Custom Experience**: Includes a smooth cursor follower and refined micro-interactions.

## � Admin Panel Capabilities

The secure admin dashboard allows for complete control over the portfolio's content:

- **👤 Profile Management**: Update personal information, including name, bio, social links, and contact details.
- **💼 Experience Manager**:
  - Add, edit, or delete work history entries.
  - Interactive date pickers for duration management.
  - "Currently Working" toggle for active positions.
- **🚀 Project Showcase**:
  - Full CRUD (Create, Read, Update, Delete) functionality for projects.
  - Manage project titles, descriptions, technologies used, and live/GitHub links.
- **🛠️ Skills Inventory**:
  - Manage technical skills and proficiency levels.
  - Organize skills into categories for better presentation.
- **📬 Message Center**: View and manage inquiries received through the contact form.
- **🔐 Secure Access**: Protected login system to ensure only the owner can modify content.

## �🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://reactjs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) / [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS & CSS Modules

### Backend & Database

- **Backend**: Next.js Server Actions
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MySQL
- **Driver**: `mysql2`

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <repository-url>
cd portfolio
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory and add your MySQL connection string:

```env
DATABASE_URL="mysql://username:password@localhost:3306/portfolio_db"
```

### 3. Database Migration

Run the Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio and [http://localhost:3000/admin](http://localhost:3000/admin) to manage it.

## 📁 Project Structure

- `app/`: Contains the main routes and server actions.
- `components/`: Reusable React components (Hero, Projects, Skills, etc.).
- `prisma/`: Database schema and migration files.
- `public/`: Static assets like images and fonts.
- `lib/`: Utility functions and database client initialization.

## 📈 Recent Improvements

- ✅ Connected frontend components to MySQL using Prisma.
- ✅ Implemented CRUD functionality for Projects, Skills, and Experience in the Admin Panel.
- ✅ Added advanced UI elements like date pickers and status toggles.
- ✅ Optimized production builds with Prisma generation steps.
- ✅ Enhanced profile management and form validation.

---

Built with ❤️ by [Your Name]

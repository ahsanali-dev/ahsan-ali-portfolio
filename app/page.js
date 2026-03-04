// Server Component

import Scene3DWrapper from "@/components/Scene3DWrapper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CursorFollower from "@/components/CursorFollower";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const profile = await prisma.profile.findFirst();

  return (
    <main>
      <CursorFollower />
      <Scene3DWrapper />
      <Navbar profile={profile} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}

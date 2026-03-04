import { prisma } from "@/lib/prisma";
import AboutClient from "./AboutClient";

export default async function About() {
  const profile = await prisma.profile.findFirst();

  return <AboutClient profile={profile} />;
}

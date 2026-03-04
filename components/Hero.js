import { prisma } from "@/lib/prisma";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const profile = await prisma.profile.findFirst();

  return <HeroClient profile={profile} />;
}

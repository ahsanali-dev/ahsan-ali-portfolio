import "./globals.css";
import { prisma } from "@/lib/prisma";

export async function generateMetadata() {
  let profile = null;
  try {
    profile = await prisma.profile.findFirst();
  } catch (e) {}

  const name = profile?.userName || "Ahsan Ali";
  const headline =
    profile?.headline || "Frontend Developer & React/Next.js Expert";
  const about =
    profile?.about ||
    "Passionate frontend developer specializing in creating engaging web experiences.";

  return {
    title: `${headline} | ${name}`,
    description: about,
    openGraph: {
      title: `${name} — Portfolio`,
      description: about,
      type: "website",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

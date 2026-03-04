import "./globals.css";

export const metadata = {
  title: "Frontend Developer | Creative Portfolio",
  description:
    "A premium 3D portfolio showcasing innovative frontend development and UI/UX design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

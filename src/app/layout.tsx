import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "프로포즈 앨범",
  description: "지원이를 위한 프로포즈 앨범",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center items-center h-[100vh] bg-pink-200">{children}</div>
      </body>
    </html>
  );
}

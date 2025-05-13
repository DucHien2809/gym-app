import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Gym Management System",
  description: "Hệ thống quản lý phòng gym hiện đại và tiện lợi",
  keywords: "gym, quản lý, fitness, thể hình, phòng tập, hệ thống",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={poppins.variable}>
      <body className={poppins.className}>
        <AuthProvider>
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

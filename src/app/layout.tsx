import type { Metadata } from "next";
import "@/app/styles/globals.css";
import Header from "./components/Header";
import PromptInput from "./components/PromptInput";
import Sidebar from "./components/Sidebar";
import Blinds from "./components/Blinds";
import SidebarDrawer from "./components/SidebarDrawer";
import "@/app/styles/fonts.css";

export const metadata: Metadata = {
  title: "SamurAI",
  description: "AI chat-bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        <Sidebar />
        <SidebarDrawer />
        {children}
        <PromptInput />
        <Blinds />
      </body>
    </html>
  );
}

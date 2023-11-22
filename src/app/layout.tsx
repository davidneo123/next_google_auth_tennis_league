import TopBar from "./components/TopBar";
import Providers from "./components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tennis League App",
  description: "Technical Test",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <TopBar />
          <div className="flex min-h-screen p-24">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

import "@/app/globals.css"
import Link from "next/link";
import {Inter} from "next/font/google"
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "もんしょーのブログ",
  description: "プログラミング学習向けサイト"
}

export default function RootLayout({
  children
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
    <body className={inter.className}>
      <UserProvider>
      <Navigation/>
      <Breadcrumb/>
      <div className="min-h-screen bg-gray-50 text-gray-600">
        {children}
      </div>
      <Toaster />

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025もんしょーのブログ All rights reserved.</p>
        </div>
      </footer>
      </UserProvider>
    </body>
    </html>
  )
}
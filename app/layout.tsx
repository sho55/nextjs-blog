import "@/app/globals.css"
import Link from "next/link";
import {Inter} from "next/font/google"

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
      <header className="bg-white shadow-sm text-gray-600 border-b p-4">
        <nav className="container mx-auto p-4 ">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              もんしょーのブログ
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-400 hover:text-gray-800 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-gray-400 hover:text-gray-800 transition-colors">
              ブログ記事
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-gray-800 transition-colors">
                このブログについて
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-gray-800 transition-colors">
              　お問い合わせ
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="min-h-screen bg-gray-50">
        {children}
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025もんしょーのブログ All rights reserved.</p>
        </div>
      </footer>
    </body>
    </html>
  )
}
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/old_Button";

export default function Navigation(){
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // ナビゲーションの種類
    const navItems = [
        { href: "/", label: "ホーム"},
        { href: "/blog", label: "記事"},
        { href: "/about", label: "ブログについて"},
        { href: "/contact", label: "お問い合わせ"},
    ]

    //アクティブのリンクを判定
    const isActive = (href:string):boolean => {
        if (href === "/"){
            return pathname === href;
        }
        return pathname.startsWith(href)
    }

    return (
    <header className="bg-white shadow-sm text-gray-600 border-b p-4">
        <nav className="container mx-auto p-4 ">
            <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
                もんしょーのブログ
            </Link>
            {/* PCのナビゲーション */}
                <div className="hidden md:flex space-x-6">
                    {navItems.map( (navItem) => (
                        <Link key={navItem.href}
                        href={navItem.href}
                        className={`font-medium transition-colors ${isActive(navItem.href) ?"text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}>{navItem.label}</Link>
                    ))}
                </div>
            {/* SPのナビゲーション */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
            </button>
            </div>
                        
            {/* モバイルメニュー */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-gra-200">
                    <div className="flex flex-col space-y-2 pt-3">
                        {navItems.map((navItem) => (
                            <Link
                            key={navItem.href}
                            href={navItem.href}
                            onClick={() => setIsMobileMenuOpen(false)} className={`px-3 py-2 rounded-md font-medium transition-colors ${isActive(navItem.href)?"text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>{navItem.label}</Link>
                        ))}
                        
                    </div>
                </div>
            )}
        </nav>
        </header>
    )

}
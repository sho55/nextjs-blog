"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// セグメントの整形する
function formatSegmentLabel(segment:string): string {
    //urlのデコード
    const decoded = decodeURIComponent(segment);

    //処理
    const formattedLabels:Record<string, string> = {
        blog:"ブログ",
        about: "ブログについて",
        contact: "お問い合わせ",
        category: "カテゴリー"
    }
    return (formattedLabels[decoded] || decoded.charAt(0).toUpperCase() + decoded.slice(1))
}

export default function Breadcrumb(){
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter((segment) => segment);

    //ぱんくずリスト
    const breadcrumbs = pathSegments.map((segment,index) =>{
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const label = formatSegmentLabel(segment);
        const isLast = index === pathSegments.length-1;

        return {href, label, isLast }
    })

    // ホームを先頭に追加したもの
    const fullBreadcrumbs = [
        {href: "/", label: "ホーム", isLast: false},
        ...breadcrumbs
    ]

    //　ホームでは非表示にする
    if (pathname === "/"){
        return null;
    }

    return (
        <nav className="bg-gray-50 px-4 py-2 border-b">
              <div className="container mx-auto flex items-center space-x-2 text-sm">
                {fullBreadcrumbs.map((item, index) => (
                  <div key={item.href} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">→</span>}
        
                    {item.isLast ? (
                      <span className="text-gray-700 font-medium">{item.label}</span>
                    ) : (
                      <Link href={item.href} className="text-blue-600 hover:underline">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>
    )
}
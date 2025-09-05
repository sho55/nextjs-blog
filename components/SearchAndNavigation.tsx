"use client"

import { useRouter,useSearchParams,usePathname } from "next/navigation"
import { useState } from "react";

export default function SearchAndNavigation(){
    // ルーターと検索パラメータを使用
    const router = useRouter();
    // 検索パラメータ
    const searchParams = useSearchParams();
    // パス名
    const pathname = usePathname();

    // 検索キーワードを管理
    const [searchTerm,setSearchTerm] = useState(searchParams.get("q") || "");


    // 検索
    const handleSearch = (e: React.FormEvent) =>{
        // フォームの送信をキャンセル
        e.preventDefault();

        //検索キーワードがあれば、検索パラメーターに追加してルータを更新
        if (searchTerm.trim()){
            // JSでのページ移動
            router.push(`/blog?q=${encodeURIComponent(searchTerm.trim())}`)
        }
    }

    // 検索クリア
    const clearSearch = () =>{
        setSearchTerm("");
        router.push("/blog");
    }

    // 戻る・進む
    const goBack = () => router.back();
    const goForward = () => router.forward();

    //ページの更新(リフレッシュ)
    const refreshPage = () => router.refresh();

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">ナビゲーション機能</h2>

            {/* 検索フォーム */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="キーワードを入力してください" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">検索</button>
                    {/* クリアボタン */}
                    {searchTerm && (
                        <button onClick={clearSearch} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">クリア</button>
                    )}
                </div>
            </form>

            {/* ナビゲーション */}

            <div>
                <h2>現在の状況</h2>
                <div>
                    <p>パス名: {pathname}</p>
                    <p>検索クエリ:{searchParams.get("q") || "なし"}</p>
                    <p>全パラメータ:{searchParams.toString() || "なし"}</p>
                </div>
            </div>
            {/* useRouterのボタン */}
            <div className="flex flex-wrap gap-2">
                <button onClick={goBack} className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700">←戻る</button>
            
                <button onClick={goForward} className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700">進む→</button>
            
                <button onClick={refreshPage} className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700">更新🔄</button>
            </div>
            
        </div>
    )
}
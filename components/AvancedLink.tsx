import Link from "next/link";

export default function AdvancedLinkExample (){
    return(
        <div className="flex flex-col space-y-4 p-6">
            {/* 基本的なリンク */}
            <Link href="blog" className="text-blue-600 hover:under-line">
            基本的なリンク
            </Link>
            {/* 外部リンク */}
            <Link href="blog" target="_blank"
            rel="noopener noreferrer" className="text-blue-600 hover:under-line">
            外部リンク
            </Link>
            {/* プリフェッチの制御 */}
            <Link href="blog" 
            prefetch={false}
            className="text-blue-600 hover:under-line">
            プリフェッチリンク
            </Link>
            {/* オブジェクト形式のhref */}
            <Link href={{
                pathname:"/blog"
            }} 
            className="text-blue-600 hover:under-line">
            オブジェクト形式
            </Link>
        </div>
    )
}
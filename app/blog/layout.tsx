import BlogSidebar from "@/components/BlogSideBar";
import { getAllPosts } from "@/libs/posts";
export default function BlogLayout({
    children,
}:{
    children: React.ReactNode
}) {
    const posts = getAllPosts();
    return(
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* サイドバー */}
                <BlogSidebar posts={posts}/>
                <main className="md:col-span-3">{children}</main>
            </div>
        </div>
    )
}
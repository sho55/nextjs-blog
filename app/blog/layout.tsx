import BlogSidebar from "@/components/BlogSideBar";
import { getCategoriesForSidebar, getLatestPostsForSidebar } from "@/libs/postFromPrisma";

export default async function BlogLayout({
    children,
}:{
    children: React.ReactNode
}) {
    const categories = await getCategoriesForSidebar();
    const latestPosts = await getLatestPostsForSidebar();
    return(
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* サイドバー */}
                <BlogSidebar categories={categories} latestPosts={latestPosts}/>
                <main className="md:col-span-3">{children}</main>
            </div>
        </div>
    )
}
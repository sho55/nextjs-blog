import CachedGitHubProfile from "@/components/CachedGithubProfile"

export default function CachedGitHubProfilePage(){
    return(
        <main className="container mx-auto px-4 py-8 flex flex-col gap-4">
            <CachedGitHubProfile username="octocat"/>
            <CachedGitHubProfile username="ohmyzsh"/>
            <CachedGitHubProfile username="github"/>
            <CachedGitHubProfile username="sho55"/>
            
        </main>
    )
}
import GitHubProfile from "@/components/GithubProfile";

export default function GitHubProfilePage(){
    return(
        <main className="container mx-auto px-4 py-8 flex flex-col gap-4">
            <GitHubProfile username="octocat"/>
            <GitHubProfile username="ohmyzsh"/>
            <GitHubProfile username="github"/>
            <GitHubProfile username="sho55"/>
            
        </main>
    )
}
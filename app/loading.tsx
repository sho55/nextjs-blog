export default function Loading(){
    return(
        <div className="flex justify-center items-center py-12">
            {/* SpinMark */}
            <div className="animate-spin rounded-full h-12 w-12"></div>
            <p className="ml-4">ローディング中...</p>
        </div>
    )
}
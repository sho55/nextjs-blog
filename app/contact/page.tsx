export default function ContactPage(){
    return(
           <main className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1>お問い合わせ</h1>
                <div className="bg-white rounded-4xl shadow-2xl p-6 text-blue-300">
                    <h2 className="text-xl font-semibold">連絡方法</h2>
                    <div>
                        <h3>Email</h3>
                    </div>
                    <div>
                        <h3>SNS</h3>
                        <div>
                            <a href="#" target="_blank" rel="noopener noreferrer">Github</a>
                        </div>
                        <div>
                            <a href="#" target="_blank" rel="noopener noreferrer">X</a>
                        </div>
                        <div>
                            <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
                        </div>
                    </div>
                </div>
              </div>
            </main>
    )
}
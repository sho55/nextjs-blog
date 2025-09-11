import ContactForm from "@/components/ContactForm";

export default function ContactPage(){
    return(
           <main className="container mx-auto px-4 py-8">
              <div className="text-center">
                <div className="bg-white rounded-4xl shadow-2xl p-6">
                    <ContactForm/>
                </div>
              </div>
            </main>
    )
}
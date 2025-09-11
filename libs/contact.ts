import { Contact } from "@/types/contact"; 

export async function sendContactForm(contact:Contact): Promise<void>{
    // バリデーション
    contact.name = contact.name.trim();
    contact.email = contact.email.trim();
    contact.body = contact.body.trim();

    if(!contact.name ||!contact.email ||!contact.body ){
        throw new Error("名前、メールアドレス、内容は必須です")
    }

    // ダミー処理
    console.log("送信内容:",contact);
    return;
}
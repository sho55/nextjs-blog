"use client"
import AdvancedLinkExample from "@/components/AvancedLink";
import { useState,useEffect } from "react";
export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>("")

  useEffect(() =>{
    //初期値を設定
    updateDate();

    //1秒ごとに更新
    const interval = setInterval(updateDate,1000);

    return () => clearInterval(interval);
  },[])

  const updateDate = () =>{
    const nowDate = new Date();

    const formattedDate = nowDate.toLocaleDateString("jp-JP",{
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    setCurrentDate(formattedDate)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1>もんしょーのブログ</h1>
        <p className="text-xl text-gray-600 mb-8">
          Next.js学習者のためのサイト
        </p>
        <AdvancedLinkExample/>
        
      </div>
    </main>
  );
}

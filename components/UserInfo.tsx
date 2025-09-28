"use client";

import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
export function UserInfo() {
  const { user, logout } = useUser();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("サインアウトエラー:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="border border-gray-200 p-2 rounded-md">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <Link href="/my-page" className="">
            <p className="text-blue-700 hover:text-blue-800 text-sm font-semibold">
              {user.user_metadata?.full_name}
            </p>
          </Link>
        </div>
        <p className="text-sm">
          権限:
          <span className="text-gray-800 font-semibold">
            {user.user_metadata?.role || "ユーザー"}
          </span>
        </p>
      </div>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="bg-gray-200 flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
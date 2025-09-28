"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deletePostFromPrisma } from "@/libs/postFromPrisma";

type DeleteButtonsProps = {
  postId: string;
};

export default function DeletePostButton({ postId }: DeleteButtonsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setShowConfirm(false);

    try {
      const result = await deletePostFromPrisma(postId);

      if (result.success) {
        toast.success(result.message);
        router.push("/blog"); // 物理削除後はブログ一覧へ
      } else {
        const error = result.errors;
        toast.error(error || "削除に失敗しました");
      }
    } catch (error) {
      console.error("削除エラー:", error);
      toast.error("削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-4">"削除の確認"</h3>
          <p className="text-gray-600 mb-6">
            "この投稿を完全に削除します。この操作は元に戻せません。本当に実行しますか？"
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={cancelDelete}>
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "処理中..." : "完全削除"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {/* 物理削除（完全削除）ボタン */}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDelete()}
        disabled={isDeleting}
      >
        🗑️ 完全削除
      </Button>
    </div>
  );
}
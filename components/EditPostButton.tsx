"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

type EditPostButtonProps = {
  postAuthorId?: string;
  postSlug: string;
}

export function EditPostButton({
  postAuthorId,
  postSlug,
}: EditPostButtonProps) {
  const { user } = useUser();

  // ユーザーがログインしていない、または記事の作者でない場合は何も表示しない
  if (!user || !postAuthorId || postAuthorId !== user.id) {
    return null;
  }

  return (
    <div className="flex justify-end p-3">
      <Link href={`/my-page/blog/edit/${postSlug}`}>
        <Button variant="outline" size="sm">
          ✏️ 編集
        </Button>
      </Link>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { updatePostFromPrisma } from "@/libs/postFromPrisma";
import { useForm } from "@/hooks/useForm";
import { ValidationRule } from "@/libs/validations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Category } from "@/lib/generated/prisma";
import { PostEditFromPrisma } from "@/types/post";

// バリデーションルールの定義
const validationRules: Partial<
  Record<keyof PostEditFromPrisma, ValidationRule<any>>
> = {
  title: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  category: {
    required: true,
  },
  content: {
    required: true,
    minLength: 10,
    maxLength: 10000,
  },
  slug: {
    required: true,
    maxLength: 100,
    pattern: /^[a-z0-9\-]+$/,
  },
};

type PostEditFormProps = {
  categories: Category[];
  post: PostEditFromPrisma;
};

export default function PostEditForm({ categories, post }: PostEditFormProps) {
  const router = useRouter();
  const { user } = useUser();

  const initialValues: PostEditFromPrisma = {
    id: post.id,
    title: post.title,
    content: post.content,
    slug: post.slug,
    category: post.category
      ? { id: post.category.id, name: post.category.name }
      : null,
    tags: post.tags.map((tag) => ({ name: tag.name })),
    isPublished: post.isPublished,
    authorId: post.authorId,
  };

  if (!post) {
    return <div>記事が見つかりません</div>;
  }
  // ユーザーがログインしていない、または記事の作者でない場合はBlogトップに戻す
  if (!user || !post.authorId || post.authorId !== user.id) {
    toast.error("この記事の編集権限はありません");
    router.push("/blog");
  }

  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset,
  } = useForm({
    initialValues,
    validationRules,
  });

  const [tagInput, setTagInput] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // エラーメッセージ表示コンポーネント
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 text-sm text-destructive mt-1">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
  };

  // カスタムフィールド変更ハンドラー（useFormと連携）
  const handleCustomChange = (name: keyof PostEditFromPrisma, value: any) => {
    handleChange(name, value);
  };

  // タグの追加
  const addTag = () => {
    if (
      tagInput.trim() &&
      !formData.tags?.some((tag) => tag.name === tagInput.trim())
    ) {
      const newTags = [...(formData.tags || []), { name: tagInput.trim() }];
      handleCustomChange("tags", newTags);
      setTagInput("");
    }
  };

  // タグの削除
  const removeTag = (tagToRemove: string) => {
    const newTags =
      formData.tags?.filter((tag) => tag.name !== tagToRemove) || [];
    handleCustomChange("tags", newTags);
  };

  // Enterキーでタグ追加
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // 独自のisSubmitting状態を追加
  const [customIsSubmitting, setCustomIsSubmitting] = useState(false);

  // フォーム送信（Server Actionを使用）
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 送信中の場合は早期リターン
    if (customIsSubmitting) return;

    setCustomIsSubmitting(true);

    try {
      // FormDataを作成してServer Actionに渡す
      // 追加
      if (!user) {
        toast.error("ログインしてください");
        return;
      }
      const formDataForAction = new FormData();
      formDataForAction.append("postId", post.id); // 投稿IDを追加
      formDataForAction.append("title", formData.title);
      formDataForAction.append("category", formData.category?.id ?? "");
      formDataForAction.append("content", formData.content);
      formDataForAction.append("slug", formData.slug || "");
      formDataForAction.append("isPublished", formData.isPublished.toString());
      formDataForAction.append(
        "tags",
        JSON.stringify(formData.tags?.map((tag) => tag.name) || [])
      );
      formDataForAction.append("authorId", user.id); // 追加

      const result = await updatePostFromPrisma(formDataForAction);

      if (result.success) {
        toast.success(result.message || "記事を更新しました！");
        // フォームをリセット
        reset();
        router.push("/blog");
      } else {
        console.log("エラー詳細:", result.errors);
        toast.error(`保存に失敗しました: ${result.errors?.join(", ")}`);
      }
    } catch (error) {
      console.error("送信エラー:", error);
      toast.error("送信中にエラーが発生しました");
    } finally {
      setCustomIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>記事編集</CardTitle>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            disabled={customIsSubmitting}
          >
            {previewMode ? "エディタ" : "プレビュー"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* タイトル */}
            <div className="md:col-span-2">
              <Label htmlFor="title">
                タイトル <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                onBlur={() => handleBlur("title")}
                placeholder="記事のタイトルを入力してください"
                disabled={customIsSubmitting}
                className={
                  errors.title && touched.title ? "border-destructive" : ""
                }
              />
              <ErrorMessage error={touched.title ? errors.title : undefined} />
            </div>

            {/* カテゴリ */}
            <div>
              <Label htmlFor="category">
                カテゴリ <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category?.id || ""}
                onValueChange={(value) => {
                  const selectedCategory = categories.find(
                    (cat) => cat.id === value
                  );
                  handleCustomChange(
                    "category",
                    selectedCategory
                      ? { id: selectedCategory.id, name: selectedCategory.name }
                      : null
                  );
                }}
                onOpenChange={(open) => {
                  if (!open && formData.category) {
                    handleBlur("category");
                  }
                }}
                disabled={customIsSubmitting}
              >
                <SelectTrigger
                  className={
                    errors.category && touched.category
                      ? "border-destructive"
                      : ""
                  }
                >
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage
                error={
                  touched.category && formData.category === undefined
                    ? errors.category
                    : undefined
                }
              />
            </div>
          </div>

          {/* タグ */}
          <div>
            <Label>
              タグ<span className="text-muted-foreground">（オプション）</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags?.map((tag) => (
                <Badge key={tag.name} variant="secondary" className="pr-1">
                  {tag.name}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(tag.name)}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="タグを入力してEnterまたは追加ボタン"
                disabled={customIsSubmitting}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                disabled={customIsSubmitting}
              >
                追加
              </Button>
            </div>
          </div>

          {/* 内容 */}
          <div>
            <Label htmlFor="content">
              内容 <span className="text-destructive">*</span>
            </Label>
            {previewMode ? (
              <div className="w-full min-h-96 px-3 py-2 border rounded-md bg-muted/50">
                <div className="prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formData.content.replace(/\n/g, "<br>"),
                    }}
                  />
                </div>
              </div>
            ) : (
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={(e) => handleCustomChange("content", e.target.value)}
                onBlur={() => handleBlur("content")}
                rows={20}
                placeholder="記事の内容を入力してください"
                disabled={customIsSubmitting}
                className={
                  errors.content && touched.content ? "border-destructive" : ""
                }
              />
            )}
            <ErrorMessage
              error={touched.content ? errors.content : undefined}
            />
          </div>

          {/* スラッグ */}
          <div>
            <Label htmlFor="slug">
              スラッグ（URL用）<span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug || ""}
              onChange={(e) =>
                handleCustomChange("slug", e.target.value || undefined)
              }
              onBlur={() => handleBlur("slug")}
              placeholder="article-slug-example"
              disabled={customIsSubmitting}
              className={
                errors.slug && touched.slug ? "border-destructive" : ""
              }
            />
            <ErrorMessage error={touched.slug ? errors.slug : undefined} />
            <p className="text-xs text-muted-foreground mt-1">
              英数字とハイフンのみ使用可能。
            </p>
          </div>

          {/* 公開設定 */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) =>
                handleCustomChange("isPublished", checked)
              }
              disabled={customIsSubmitting}
            />
            <Label htmlFor="isPublished">すぐに公開する</Label>
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              disabled={customIsSubmitting}
            >
              リセット
            </Button>
            <Button
              type="submit"
              disabled={customIsSubmitting}
              className="min-w-[120px]"
            >
              {customIsSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  送信中...
                </>
              ) : formData.isPublished ? (
                "公開"
              ) : (
                "下書き保存"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
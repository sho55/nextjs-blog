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
import { BlogCreate } from "@/types/blog";
import { createPost } from "@/libs/blog";
import { useForm } from "@/hooks/useForm";
import { ValidationRule } from "@/libs/validations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// バリデーションルールの定義
const validationRules: Partial<
  Record<keyof BlogCreate, ValidationRule<any>>
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

export default function PostCreationForm() {
  const router = useRouter();

  const initialValues: BlogCreate = {
    title: "",
    category: "",
    tags: [],
    content: "",
    slug: "",
    isPublished: false,
  };

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
  const handleCustomChange = (name: keyof BlogCreate, value: any) => {
    handleChange(name, value);
  };

  // タグの追加
  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      const newTags = [...(formData.tags || []), tagInput.trim()];
      handleCustomChange("tags", newTags);
      setTagInput("");
    }
  };

  // タグの削除
  const removeTag = (tagToRemove: string) => {
    const newTags = formData.tags?.filter((tag) => tag !== tagToRemove) || [];
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
      const formDataForAction = new FormData();
      formDataForAction.append("title", formData.title);
      formDataForAction.append("category", formData.category ?? "");
      formDataForAction.append("content", formData.content);
      formDataForAction.append("slug", formData.slug || "");
      formDataForAction.append("isPublished", formData.isPublished.toString());
      formDataForAction.append("tags", JSON.stringify(formData.tags || []));

      // 元のJavaScriptオブジェクトを表示
      console.log(
        "❌ これでは中身が見えない",
        "formDataForAction:",
        formDataForAction
      );

      // FormDataの中身を確認する正しい方法
      console.log("=== FormDataの内容 ===");
      for (const [key, value] of formDataForAction.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("========================");

      const result = await createPost(formDataForAction);

      if (result.success) {
        toast.success(result.message || "記事を保存しました！");
        // フォームをリセット
        reset();
        router.push("/blog");
      } else {
        toast.error("保存に失敗しました");
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
          <CardTitle>新規記事作成</CardTitle>
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
                value={formData.category || ""}
                onValueChange={(value) => {
                  handleCustomChange("category", value);
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
                  <SelectItem value="nextjs">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
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
                <Badge key={tag} variant="secondary" className="pr-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(tag)}
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
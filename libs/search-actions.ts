"use server";

import { redirect } from "next/navigation";

export async function searchPosts(formData: FormData) {
  const query = formData.get("search") as string;

  if (!query || !query.trim()) {
    redirect("/blog");
  }

  redirect(`/blog?q=${encodeURIComponent(query.trim())}`);
}

export async function filterByCategory(formData: FormData) {
  const category = formData.get("category") as string;

  if (!category) {
    redirect("/blog");
  }

  redirect(`/blog/category/${category.toLowerCase()}`);
}
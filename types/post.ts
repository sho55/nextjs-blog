import { Category, Profile, Tag } from "@/lib/generated/prisma";
export type Post = {
  slug: string;
  title: string;
  content: string;
  abstract: string;
  date: string;
  category: string;
  author: string;
  tags: string[];
  readTime: number;
};

export type PostFromJsonPlaceHolder = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type User = {
    id:number;
    name:string;
    email:string;
}

export type PostFromJsonPlaceHolderWithUser = PostFromJsonPlaceHolder &{
    user:User
}

export type PostCreateFromPrisma ={
  slug: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  isPublished: boolean;
  authorId: string;
}

export type PostEditFromPrisma = {
  id: string;
  title: string;
  content: string;
  slug: string;
  category: { id: string; name: string } | null;
  tags: { name: string }[];
  isPublished: boolean;
  authorId: string;
};

export type PostPrisma = {
  id: string;
  title:string;
  content:string;
  slug:string;
  isPublished: boolean;
  createdAt: Date;
  category: Category;
  tags: Tag[];
  author:Profile;
}
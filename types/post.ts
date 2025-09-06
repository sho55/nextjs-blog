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
import type { Post, Comment } from "./types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Lỗi ${res.status}: không tải được dữ liệu`);
  return res.json();
}

export const fetchPosts = () => request<Post[]>("/posts");
export const fetchPost = (id: number) => request<Post>(`/posts/${id}`);
export const fetchComments = (postId: number) =>
  request<Comment[]>(`/posts/${postId}/comments`);

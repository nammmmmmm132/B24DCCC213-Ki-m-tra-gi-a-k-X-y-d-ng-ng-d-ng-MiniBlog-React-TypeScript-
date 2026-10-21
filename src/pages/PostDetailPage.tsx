import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchComments, fetchPost } from "../api";
import type { Comment, Post } from "../types";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const postId = Number(id);
    if (!postId) { setError("Bài viết không hợp lệ"); setLoading(false); return; }

    const myPosts: Post[] = JSON.parse(localStorage.getItem("miniblog_posts") || "[]");
    const myPost = myPosts.find((p) => p.id === postId);
    if (myPost) {
      setPost(myPost);
      setLoading(false);
      return;
    }

    Promise.all([fetchPost(postId), fetchComments(postId)])
      .then(([p, c]) => { setPost(p); setComments(c); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return null;

  return (
    <>
      <Link to="/">← Quay lại</Link>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>Bình luận ({comments.length})</h3>
      {comments.map((c) => (
        <div className="card" key={c.id}>
          <strong>{c.name}</strong> <small>({c.email})</small>
          <p>{c.body}</p>
        </div>
      ))}
    </>
  );
}

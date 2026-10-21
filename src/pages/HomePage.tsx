import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api";
import type { Post } from "../types";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        const myPosts = JSON.parse(localStorage.getItem("miniblog_posts") || "[]");
        setPosts([...myPosts, ...data]);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <input placeholder="Tìm theo tiêu đề..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      {filtered.length === 0 && <p>Không có bài viết phù hợp.</p>}
      {filtered.map((p) => (
        <div className="card" key={p.id}>
          <Link to={`/posts/${p.id}`}><h3>{p.title}</h3></Link>
        </div>
      ))}
    </>
  );
}

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function isCapitalized(text: string) {
  return /^\p{Lu}/u.test(text.trim());
}

export default function WritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errs: typeof errors = {};
    if (!isCapitalized(title)) errs.title = "Tiêu đề phải viết hoa chữ cái đầu";
    else if (countWords(title) < 3) errs.title = "Tiêu đề tối thiểu 3 chữ";

    if (!isCapitalized(body)) errs.body = "Nội dung phải viết hoa chữ cái đầu";
    else if (countWords(body) < 5) errs.body = "Nội dung tối thiểu 5 chữ";

    setErrors(errs);
    if (errs.title || errs.body) return;

    const saved = JSON.parse(localStorage.getItem("miniblog_posts") || "[]");
    const newPost = { id: Date.now(), userId: 0, title: title.trim(), body: body.trim() };
    saved.unshift(newPost);
    localStorage.setItem("miniblog_posts", JSON.stringify(saved));

    navigate("/");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Viết bài mới</h2>
      <input placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} />
      {errors.title && <p className="error">{errors.title}</p>}
      <textarea rows={6} placeholder="Nội dung" value={body} onChange={(e) => setBody(e.target.value)} />
      {errors.body && <p className="error">{errors.body}</p>}
      <button type="submit">Đăng bài</button>
    </form>
  );
}

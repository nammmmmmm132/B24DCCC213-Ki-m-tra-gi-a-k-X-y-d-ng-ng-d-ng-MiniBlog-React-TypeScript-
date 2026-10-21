import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <strong>MiniBlog</strong>
        <Link to="/">Trang chủ</Link>
        <Link to="/write">Viết bài</Link>
        <span className="spacer" />
        {isLoggedIn ? (
          <button onClick={() => { logout(); navigate("/"); }}>Đăng xuất</button>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

import { Outlet, Link } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div style={{ padding: 16 }}>
      <h1>My App</h1>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/">Home</Link> | <Link to="/posts">Posts</Link> |{" "}
        <Link to="/posts/new">New Post</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

import { Outlet } from "@tanstack/react-router";

export default function Posts() {
    return (
        <div>
            <h2>Posts</h2>
            <Outlet />
        </div>
    );
}

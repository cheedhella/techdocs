/*
Outlet
    - It is a placeholder component;
    - It tells the router: when a child render it here inside the parent’s layout; Otherwise, nested routes would never appear;
*/
import { Outlet } from "@tanstack/react-router";

export default function Posts() {
    return (
        <div>
            <h2>Posts</h2>
            <Outlet />
        </div>
    );
}

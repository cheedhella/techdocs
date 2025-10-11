import { createRoute } from "@tanstack/react-router";
import { postsRoute } from "./posts"
import PostsList from "../../pages/posts/PostsList";

export const listPostsRoute = createRoute({
    getParentRoute: () => postsRoute,
    path: "/",
    loader: async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
    },
    component: () => {
        const posts = listPostsRoute.useLoaderData() as Array<{ id: number; title: string }>;
        return <PostsList posts={posts} />;
    },
});

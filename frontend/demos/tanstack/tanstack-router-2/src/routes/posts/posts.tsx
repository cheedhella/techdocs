import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import Posts from "../../pages/posts/Posts";

export const postsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "posts",
    component: Posts,
});

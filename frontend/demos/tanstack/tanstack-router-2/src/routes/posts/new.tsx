import { createRoute } from "@tanstack/react-router";
import { postsRoute } from "./posts"
import NewPost from "../../pages/posts/NewPost";

export const newPostRoute = createRoute({
    getParentRoute: () => postsRoute,
    path: "new",
    component: NewPost,
});

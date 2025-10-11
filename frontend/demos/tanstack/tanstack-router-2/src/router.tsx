import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";
import { postsRoute } from "./routes/posts/posts";
import { listPostsRoute } from "./routes/posts/list";
import { newPostRoute } from "./routes/posts/new";
import { notFoundRoute } from "./routes/notFoundRoute";
import { alarmsRoute } from "./routes/alarmsRoute";

const routeTree = rootRoute.addChildren([
    indexRoute,
    postsRoute.addChildren([listPostsRoute, newPostRoute]),
    alarmsRoute,
    notFoundRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

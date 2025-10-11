import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";
import { postsRoute } from "./routes/posts/posts";
import { listPostsRoute } from "./routes/posts/list";
import { newPostRoute } from "./routes/posts/new";

const routeTree = rootRoute.addChildren([
    indexRoute,
    postsRoute.addChildren([listPostsRoute, newPostRoute]),
]);

export const router = createRouter({ routeTree });

/*
declare module <package> - In TS, it is used to extend the type definitions of an existing package;
Register
    - It is a special empty interface inside @tanstack/react-router;
    - You can register your route types, so that they are available globally;
*/
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

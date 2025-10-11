import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "*", // catch-all
    component: () => (
        <>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </>
    ),
});
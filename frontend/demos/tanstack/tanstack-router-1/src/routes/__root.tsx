/*
createRootRoute 
    - It defines entry point of your applicaiton; You should pass it to the RouterProvider;
    - It returns a RootRoute instance that has methods like: addChildren(), useLoaderData() etc;
    - You need to nest all other routes under it;
    - Config:
        - path -> Path is implicit for root route;
        - component -> react component to render;
        - loader -> data fetching logic;
        - errorComponent -> error boundary for that route;
        - pendingComponent -> loading state handler;
    - API:

createFileRoute
    - Use it for file based routing, never mix file-based routing with manual addChildren();

Route
RootRoute 
    - getParentRoute -> returns parent root(for children, not needed for root);
    - addChildren -> to add child routes;
    - useLoaderData -> to access data fetched by loader;
    - useRouteError -> to access error thrown by loader or action;
    - useMatch -> to get match object for the route;
    - useParams -> to get params for the route;
    - useSearch -> to get search params for the route;
    - useNavigate -> to navigate programmatically;
    - useLocation -> to get current location object;
    - useIsPending -> to check if a navigation is in progress;
    - useIsRouting -> to check if the router is currently routing;
    - useRouter -> to get the router instance;

*/
import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../pages/RootLayout";

export const rootRoute = createRootRoute({
    component: RootLayout,
});

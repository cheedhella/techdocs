import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import LoginPage from "./pages/login/LoginPage";
import useAuthStore from "./stores/useAuthStore";
import HomePage from "./pages/home/HomePage";
import SettingsPage from "./pages/settings/SettingsPage";

const rootRoute = createRootRoute({
    component: () => <Outlet />,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/home",
    beforeLoad: () => {
        const isLoggedIn = useAuthStore.getState().isLoggedIn;
        if (!isLoggedIn) throw redirect({ to: "/login" });
    },
    component: HomePage,
});

const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/settings",
    beforeLoad: () => {
        const isLoggedIn = useAuthStore.getState().isLoggedIn;
        if (!isLoggedIn) throw redirect({ to: "/login" });
    },
    component: SettingsPage,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    loader: () => {
        throw redirect({ to: "/login" });
    },
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    homeRoute,
    settingsRoute
]);

export const routerInstance = createRouter({ routeTree });
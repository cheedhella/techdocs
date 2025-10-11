import { createRootRoute } from "@tanstack/react-router";
import DashboardLayout from "../components/DashboardLayout";

export const rootRoute = createRootRoute({
    component: DashboardLayout,
});

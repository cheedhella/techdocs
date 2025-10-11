import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import AlarmsTable from "../pages/AlarmsTable";

export const alarmsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/alarms",
    component: AlarmsTable,
});
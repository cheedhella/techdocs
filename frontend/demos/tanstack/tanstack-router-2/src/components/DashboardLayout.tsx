import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    CssBaseline,
    Box,
    Divider,
} from "@mui/material";
import {
    Home as HomeIcon,
    Assessment as AssessmentIcon,
    Storage as StorageIcon,
    BarChart as BarChartIcon,
    Favorite as FavoriteIcon,
    Settings as SettingsIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Help as HelpIcon,
    AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

// The <Outlet /> inside root(DashboardLayout) renders the active child route.
import { Link, Outlet } from "@tanstack/react-router";

const drawerWidth = 70;

export default function DashboardLayout() {
    const navItems = [
        { icon: <HomeIcon />, label: "Home", to: "/" },
        { icon: <AssessmentIcon />, label: "Reports", to: "/reports" },
        { icon: <StorageIcon />, label: "Inventory", to: "/inventory" },
        { icon: <BarChartIcon />, label: "Analytics", to: "/analytics" },
        { icon: <FavoriteIcon />, label: "Posts", to: "/posts" },
        { icon: <SettingsIcon />, label: "Settings", to: "/settings" },
        { icon: <AssessmentIcon />, label: "Alarms", to: "/alarms" }, 
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Top Bar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "#1976d2",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" noWrap component="div">
                        DX NetOps
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton color="inherit">
                            <SearchIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <HelpIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Left Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#f8f9fa",
                        borderRight: "1px solid #ddd",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {navItems.map((item, index) => (
                            <ListItem
                                key={index}
                                sx={{ justifyContent: "center", py: 2 }}
                                component={Link}
                                to={item.to}
                            >
                                <ListItemIcon sx={{ minWidth: 0, color: "#555" }}>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, backgroundColor: "#fafafa", minHeight: "100vh" }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

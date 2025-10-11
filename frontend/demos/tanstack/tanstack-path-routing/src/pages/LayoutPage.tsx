import { useState, type ReactNode } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Box,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Settings as SettingsIcon,
    Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';

const drawerWidth = 240;

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            {/* Header */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        DX NetOps Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Wrapper for Drawer and Main Content */}
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                {/* Sidebar Navigation */}
                <Drawer
                    variant="permanent"
                    anchor="left"
                    sx={(theme) => ({
                        width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        '& .MuiDrawer-paper': {
                            width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                            boxSizing: 'border-box',
                            overflowX: 'hidden',
                            position: 'relative', // Keep drawer in its container's flow
                        },
                    })}
                >
                    <Toolbar />
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate({ to: '/home' })}
                                sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                            >
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate({ to: '/settings' })}
                                sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                            >
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main Content Area */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Broadcom DX NetOps. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

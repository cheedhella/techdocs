import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import Layout from "../LayoutPage";

// Mock data structure
const settingsGroups: {
    groupName: string;
    links: { name: string; path: string }[]
}[] = [
        {
            groupName: "User Management",
            links: [
                { name: "Add User", path: "/settings/users/add" },
                { name: "Edit User", path: "/settings/users/edit" },
                { name: "Delete User", path: "/settings/users/delete" },
            ],
        },
        {
            groupName: "Device Management",
            links: [
                { name: "Add Device", path: "/settings/devices/add" },
                { name: "Edit Device", path: "/settings/devices/edit" },
                { name: "Device Groups", path: "/settings/devices/groups" },
            ],
        },
        {
            groupName: "Network Policies",
            links: [
                { name: "Firewall Rules", path: "/settings/network/firewall" },
                { name: "Routing Policies", path: "/settings/network/routing" },
                { name: "QoS Rules", path: "/settings/network/qos" },
            ],
        },
        // ... more groups
    ];

export default function Settings() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Filter groups based on search query
    const filteredGroups = settingsGroups
        .map((group) => ({
            ...group,
            links: group.links.filter((link) =>
                link.name.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter((group) => group.links.length > 0); // remove groups with no matching links

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>

                {/* Search Field */}
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Search settings"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                {/* Settings Groups */}
                <Grid container spacing={2}>
                    {filteredGroups.map((group, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {group.groupName}
                                    </Typography>
                                    {group.links.map((link, idx) => (
                                        <Box key={idx} sx={{ mb: 1 }}>
                                            <Button
                                                variant="text"
                                                fullWidth
                                                onClick={() => navigate({ to: link.path })}
                                            >
                                                {link.name}
                                            </Button>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {filteredGroups.length === 0 && (
                        <Grid item xs={12}>
                            <Typography>No matching settings found.</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Layout>
    );
}

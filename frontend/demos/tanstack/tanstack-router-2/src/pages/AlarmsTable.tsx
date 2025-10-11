import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid"; // TS type-only import
import { Box, Typography } from "@mui/material";

const columns: GridColDef[] = [
    { field: "severity", headerName: "Severity", width: 120 },
    { field: "lastOccurrence", headerName: "Last Occurrence", width: 200 },
    { field: "dateTime", headerName: "Date/Time", width: 200 },
    { field: "itemName", headerName: "Item Name", width: 180 },
    { field: "modelType", headerName: "Model Type", width: 140 },
    { field: "ipAddress", headerName: "IP Address", width: 150 },
    { field: "alarmTitle", headerName: "Alarm Title", flex: 1 },
];

const rows = [
    {
        id: 1,
        severity: "Major",
        lastOccurrence: "Jun 6, 2023 12:27",
        dateTime: "Jun 6, 2023 12:27",
        itemName: "e3.mydomain.com",
        modelType: "Cisco3640",
        ipAddress: "192.1.x.x",
        alarmTitle: "A Threshold Violation event has been raised...",
    },
    {
        id: 2,
        severity: "Critical",
        lastOccurrence: "Jun 6, 2023 9:26",
        dateTime: "Jun 6, 2023 9:26",
        itemName: "FastEthernet2/0",
        modelType: "Cisco3640",
        ipAddress: "192.1.x.x",
        alarmTitle: "CRITICAL ALARM ON INTERFACE DUE TO LOST BGP PEERING SESSION",
    },
    {
        id: 3,
        severity: "Critical",
        lastOccurrence: "Jun 6, 2023 9:24",
        dateTime: "Jun 6, 2023 9:24",
        itemName: "mydomain.com",
        modelType: "Cisco3640",
        ipAddress: "192.1.x.x",
        alarmTitle: "CHASSIS DOWN",
    },
    {
        id: 4,
        severity: "Critical",
        lastOccurrence: "Jun 6, 2023 7:00",
        dateTime: "Jun 6, 2023 7:00",
        itemName: "te3_rtr_01",
        modelType: "M10",
        ipAddress: "10.1.4.1",
        alarmTitle: "UNRESOLVED FAULT DETECTED",
    },
];

export default function AlarmsTable() {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Alarms
            </Typography>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5, page: 0 } },
                    }}
                />
            </div>
        </Box>
    );
}

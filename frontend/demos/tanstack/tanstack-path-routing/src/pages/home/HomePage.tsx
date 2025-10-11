/*
💡 Structurally, you can group the homepage like this:

Top Row = Status KPIs (alarms, devices, sites).

Middle Row = Detailed Grids (alarms table, events table).

Bottom Row = Trends/Performance (charts, site health map).

Side Panel (optional) = quick actions / shortcuts.
*/
import Grid from "@mui/material/Grid";
import Layout from "../LayoutPage";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Chip,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Mock Data
const alarmSummary = [
  { severity: "Critical", count: 12, color: "#e53935" },
  { severity: "Major", count: 24, color: "#fb8c00" },
  { severity: "Minor", count: 45, color: "#fdd835" },
  { severity: "Info", count: 103, color: "#1e88e5" },
];

const latestAlarms = [
  {
    severity: "Critical",
    device: "Router-1",
    title: "Device Down",
    time: "11:02 AM",
    ack: "No",
    duration: "20m",
  },
  {
    severity: "Major",
    device: "Switch-3",
    title: "High CPU",
    time: "10:58 AM",
    ack: "Yes",
    duration: "24m",
  },
];

const latestEvents = [
  {
    time: "11:05",
    device: "Router-1",
    type: "Link Down",
    severity: "Critical",
    component: "Gi0/1",
  },
  {
    time: "11:03",
    device: "Switch-3",
    type: "Config Change",
    severity: "Info",
    component: "System",
  },
];

const alarmTrend = [
  { time: "09:00", alarms: 10 },
  { time: "10:00", alarms: 20 },
  { time: "11:00", alarms: 15 },
  { time: "12:00", alarms: 30 },
];

const topUtilization = [
  { name: "Link1", value: 80 },
  { name: "Link2", value: 65 },
  { name: "Link3", value: 55 },
];

const recentActivity = [
  { user: "Alice", action: "Acknowledged Alarm", device: "Router-1", time: "11:10 AM" },
  { user: "Bob", action: "Cleared Alarm", device: "Switch-3", time: "11:05 AM" },
];

const pendingTickets = [
  { id: "TCK-101", device: "Router-1", title: "Replace faulty module", priority: "High" },
  { id: "TCK-102", device: "Switch-2", title: "Check CPU utilization", priority: "Medium" },
];

export default function HomePage() {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Top Row - Alarm Summary */}
          {alarmSummary.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.severity}>
              <Card sx={{ bgcolor: item.color, color: "white" }}>
                <CardContent>
                  <Typography variant="h6">{item.severity}</Typography>
                  <Typography variant="h4">{item.count}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Latest Alarms */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Latest Alarms
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Severity</TableCell>
                      <TableCell>Device</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Ack</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {latestAlarms.map((a, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Chip
                            label={a.severity}
                            color={
                              a.severity === "Critical"
                                ? "error"
                                : a.severity === "Major"
                                  ? "warning"
                                  : "info"
                            }
                          />
                        </TableCell>
                        <TableCell>{a.device}</TableCell>
                        <TableCell>{a.title}</TableCell>
                        <TableCell>{a.time}</TableCell>
                        <TableCell>{a.ack}</TableCell>
                        <TableCell>{a.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Latest Events */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Latest Events
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Time</TableCell>
                      <TableCell>Device</TableCell>
                      <TableCell>Event</TableCell>
                      <TableCell>Severity</TableCell>
                      <TableCell>Component</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {latestEvents.map((e, i) => (
                      <TableRow key={i}>
                        <TableCell>{e.time}</TableCell>
                        <TableCell>{e.device}</TableCell>
                        <TableCell>{e.type}</TableCell>
                        <TableCell>
                          <Chip
                            label={e.severity}
                            color={e.severity === "Critical" ? "error" : "info"}
                          />
                        </TableCell>
                        <TableCell>{e.component}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Alarm Trend Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Alarm Volume Trend (24h)
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={alarmTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="alarms" stroke="#e53935" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Utilization Pie */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Interfaces by Utilization
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={topUtilization}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={70}
                      label
                    >
                      {topUtilization.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#1e88e5", "#43a047", "#fb8c00"][index % 3]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Device</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActivity.map((activity, i) => (
                      <TableRow key={i}>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.device}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* New Grid: Pending Tickets */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pending Tickets
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Device</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Priority</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingTickets.map((ticket, i) => (
                      <TableRow key={i}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.device}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{ticket.priority}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

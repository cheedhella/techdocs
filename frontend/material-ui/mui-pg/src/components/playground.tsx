import { useState } from "react";
import {
  Button,
  TextField,
  Stack,
  Card,
  CardContent,
  Typography,
  Switch,
} from "@mui/material";
import { Add, DarkMode } from "@mui/icons-material";

export default function Playground() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  return (
    <Card variant="outlined" sx={{ mt: 3 }}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6">Counter Example</Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCount(count + 1)}
            >
              Add
            </Button>
            <Typography variant="h5">{count}</Typography>
          </Stack>

          <TextField label="Try typing here" variant="outlined" />

          <Stack direction="row" alignItems="center" spacing={1}>
            <DarkMode />
            <Switch checked={dark} onChange={(e) => setDark(e.target.checked)} />
            <Typography>{dark ? "Dark Mode On" : "Dark Mode Off"}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

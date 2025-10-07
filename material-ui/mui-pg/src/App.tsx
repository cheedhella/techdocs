import { CssBaseline, Container, Typography } from "@mui/material";
import Playground from "./components/Playground";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          MUI Playground
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          A sandbox to experiment with Material UI components.
        </Typography>
        <Playground />
      </Container>
    </>
  );
}

import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Login from "./components/Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  components: {
    // Name of the component
    MuiContainer: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // fontSize: "1rem",
          // border: "1px solid red",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // fontSize: "1rem",
          // border: "1px solid red",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";
import './index.css';

let theme = createTheme({
  palette: {
    primary: {
      main: "#16213e",
    },
    secondary: {
      main: "#2196f3",
    },
    background: {
      default: "linear-gradient(-45deg, #0f172a, #1a1a2e, #16213e, #0f3460, #1b262c)",
      paper: "rgba(15, 23, 42, 0.7)"
    },
    white: {
      main: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(-45deg, #0f172a, #1a1a2e, #16213e, #0f3460, #1b262c)',
          backgroundSize: '400% 400%',
          minHeight: '100vh',
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

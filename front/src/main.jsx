import { createRoot } from "react-dom/client";
import App from "./App";
import theme from "./theme";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';



createRoot(document.querySelector("#content")).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
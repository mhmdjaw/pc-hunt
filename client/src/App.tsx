import React from "react";
import Routes from "./components/core/Routes/Routes";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { darkTheme } from "./themes.ts";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

export default App;

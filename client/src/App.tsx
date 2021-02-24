import React from "react";
import { Routes } from "./components/core";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { lightTheme } from "./themes.ts";
import { ProvideAuth } from "./context";

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ProvideAuth>
  );
};

export default App;

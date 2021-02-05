import React from "react";
import Routes from "./components/core/Routes/Routes";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { darkTheme, lightTheme } from "./themes.ts";
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

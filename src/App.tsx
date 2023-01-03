import Router from "./Router";
import { GlobalStyle } from "./reset";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router clickHandler={toggleDark} isDark={isDark} />
      </ThemeProvider>
    </>
  );
}

export default App;

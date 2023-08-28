import { ThemeProvider } from "styled-components";
import "./App.css";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";

function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;

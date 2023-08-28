import { ThemeProvider } from "styled-components";
import "./App.css";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import NavBar from "@components/NavBar/NavBar";

function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <NavBar />
    </ThemeProvider>
  );
}

export default App;

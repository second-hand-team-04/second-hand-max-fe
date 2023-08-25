import { ThemeProvider } from "styled-components";
import "./App.css";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { Tag } from "@components/common/Tag/Tag";

function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <Tag title="Tag" isSelected={true} />
    </ThemeProvider>
  );
}

export default App;

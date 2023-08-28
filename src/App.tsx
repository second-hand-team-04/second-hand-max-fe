import { ThemeProvider } from "styled-components";
import "./App.css";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

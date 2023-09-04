import { ThemeProvider, styled } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import CustomToaster from "@components/CustomToaster";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <StyledApp>
          <RouterProvider router={router} />
          <CustomToaster />
        </StyledApp>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

const StyledApp = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
`;

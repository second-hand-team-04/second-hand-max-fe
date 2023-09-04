import { ThemeProvider, styled } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import CustomToaster from "@components/CustomToaster";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    },
  }),
});

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

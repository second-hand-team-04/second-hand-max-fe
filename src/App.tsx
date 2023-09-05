import { ThemeProvider, styled } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import CustomToaster from "@components/CustomToaster";
import useUserQuery from "api/queries/useUserQuery";

function App() {
  const { data: user } = useUserQuery();

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <StyledApp>
        <RouterProvider router={router(user?.data)} />
        <CustomToaster />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

const StyledApp = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
`;

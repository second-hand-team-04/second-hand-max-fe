import { ThemeProvider, styled } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import CustomToaster from "@components/CustomToaster";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { useEffect } from "react";

function App() {
  const { data: user, refetch: fetchUserInfo } = useUserInfoQuery();

  useEffect(() => {
    fetchUserInfo();
    console.log("App.tsx: ", user);
  }, [user, fetchUserInfo]);

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <StyledApp>
        <RouterProvider router={router(user)} />
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

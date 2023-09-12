import { ThemeProvider, styled } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import CustomToaster from "@components/CustomToaster";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { ProductItemsFiltersProvider } from "@context/ProductItemsFiltersContext";

function App() {
  const { data: user } = useUserInfoQuery();

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />

      <ProductItemsFiltersProvider>
        <StyledApp>
          <RouterProvider router={router(user)} />
          <CustomToaster />
        </StyledApp>
      </ProductItemsFiltersProvider>
    </ThemeProvider>
  );
}

export default App;

const StyledApp = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
`;

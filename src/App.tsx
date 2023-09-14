import CustomToaster from "@components/CustomToaster";
import { ProductItemsFiltersProvider } from "@context/ProductItemsFiltersContext";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import { ThemeProvider, styled } from "styled-components";

export default function App() {
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

const StyledApp = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
`;

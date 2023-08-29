import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

export default function Root() {
  return (
    <StyledRoot>
      <div>
        <Outlet />
      </div>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 393px;
  height: 852px;
`;

// import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // TODO: replace with auth context.
  // const { data: user, isFetched } = useUser();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isFetched && !user) navigate("/signin");
  // }, [isFetched, user, navigate]);

  return <Outlet />;
}

import { Navigate, Outlet } from "react-router-dom";
import { User } from "api/user";
import Routes from "./Routes";

export default function PublicOnlyRoute({ user }: { user: User | undefined }) {
  return user ? <Navigate to={Routes.HOME} /> : <Outlet />;
}

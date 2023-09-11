import { Navigate, Outlet } from "react-router-dom";
import { User } from "api/user";

export default function PublicOnlyRoute({ user }: { user: User | undefined }) {
  return user ? <Navigate to="/" /> : <Outlet />;
}

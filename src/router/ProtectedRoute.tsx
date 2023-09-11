import { User } from "api/user";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user }: { user: User | undefined }) {
  return user ? <Outlet /> : <Navigate to="/signin" />;
}

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "api/user";

export default function PublicOnlyRoute({ user }: { user: User | undefined }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <Outlet />;
}

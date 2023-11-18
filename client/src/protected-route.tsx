import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "./service/api";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLogged, setLogged] = useState(true);

  async function authenticate() {
    setLogged((await api.post("/authenticate")).status == 204);
  }

  useEffect(() => {
    authenticate();
  }, []);

  return isLogged ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

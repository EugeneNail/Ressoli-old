import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import api from "./service/api";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const [isLogged, setLogged] = useState(true);

  const authenticate = async () => {
    setLogged((await api.post("/authenticate")).status == 204);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return isLogged ? props.children : <Navigate to="/login" />;
};

export default ProtectedRoute;

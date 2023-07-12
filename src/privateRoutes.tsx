import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? <Outlet /> : <Navigate to="login" />;
};

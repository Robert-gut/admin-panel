import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Nope from "./pages/NotFound/Nope";
import Admin from "./layouts/Admin";

import Login from "../src/pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import { routes } from "./routes";

import { AuthProps, withAuth } from "./hocs/WithAuth.tsx";
import { PrivateRoutes } from "./privateRoutes.tsx";

const App = ({ isAuthenticated, setAuth }: AuthProps) => {
  console.log("auth_status", isAuthenticated);
  return (
    <Routes>
      <Route element={<PrivateRoutes isAuth={isAuthenticated} />}>
        <Route path="/admin" element={<Admin isAuth={isAuthenticated} />}>
          {routes
            .filter((route) => route.layout === "/admin")
            .map((route) => (
              <Route
                path={route.layout + route.path}
                element={route.component}
                key={route.id}
              />
            ))}
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login setAuth={setAuth} />
          ) : (
            <Navigate to={"/admin"} />
          )
        }
      />
      <Route path="/login/forgotPassword" element={<ForgotPassword />} />
      <Route path={"/"} element={<Navigate to={"/admin"} />} />
      <Route path="*" element={<Nope />} />
    </Routes>

  );
};

export default withAuth(App);

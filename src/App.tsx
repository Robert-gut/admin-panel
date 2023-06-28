import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nope from "./pages/NotFound/Nope";
import Admin from "./layouts/Admin";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword/ForgotPassword";
import TestAuth from "./pages/TestAuth/TestAuth";
import { routes } from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />}>
          {routes.map(route => <Route path={route.layout + route.path} element={route.component} key={route.id}/>)}
        </Route>
        <Route path="*" element={<Nope />} />

      </Routes>
    </Router>
  );
}

export default App;

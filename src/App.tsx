import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nope from "./pages/NotFound/Nope";
import Admin from "./layouts/Admin";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Nope />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

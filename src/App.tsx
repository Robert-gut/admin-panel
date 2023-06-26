import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nope  from './pages/NotFound/Nope'
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword/ForgotPassword";
import TestAuth from "./pages/TestAuth/TestAuth";


        
function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Nope/>} />
        <Route path="/test" element={<TestAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

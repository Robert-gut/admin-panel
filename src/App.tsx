import "./App.css";

import Profile from "./pages/Profile/proflle.tsx";
import { Nope } from './pages/NotFound/Nope'
import Userslist from "./pages/UsersList/UsersList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword/ForgotPassword";
import TestAuth from "./pages/TestAuth/TestAuth";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



        
function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Nope/>} />
        <Route path="/test" element={<TestAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="usersList" element={<Userslist />} />
          <Route path='profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

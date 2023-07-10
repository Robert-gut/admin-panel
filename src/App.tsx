import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nope from "./pages/NotFound/Nope";
import Admin from "./layouts/Admin";

import Login from "../src/pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import { routes } from "./routes";
import News from './pages/News/News'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/news" replace /> /* коли буде /admin, завджи буде перенапрвляти на /admin/news */} />
        <Route path="/" element={<Navigate to="/admin/news" replace /> /* при запуску проекту, буде завжди перенаправляти на /admin/news */} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin />}>
          {routes.filter(route => route.layout === '/admin')
          .map(route => <Route path={route.layout + route.path} element={route.component} key={route.id}/>)}
        </Route>
        <Route path="*" element={<Nope />} />
      </Routes>
    </Router>
  );
}

export default App;

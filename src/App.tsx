import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin/Admin";
import Userslist from "./pages/UsersList/UsersList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route path="usersList" element={<Userslist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

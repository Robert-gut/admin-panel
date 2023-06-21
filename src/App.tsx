import "./App.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Admin from './pages/Admin/Admin'
import Profile from "./pages/Profile/proflle.tsx";
import { Nope } from './pages/NotFound/Nope'


import Admin from "./pages/Admin/Admin";
import Userslist from "./pages/UsersList/UsersList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Nope/>} />
        <Route path="/admin" element={<Admin />}>
          <Route path="usersList" element={<Userslist />} />
          <Route path='profile' element={<Profile/>}/>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

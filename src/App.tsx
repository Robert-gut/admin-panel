import './App.css'

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Admin from './pages/Admin/Admin'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/admin' element={<Admin/>}>
          <Route path='profile' element={<Admin/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Admin from './pages/Admin/Admin'
// import { NotFound } from './pages/NotFound/Nope'
import { Nope } from './pages/NotFound/Nope'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='*' element={<Nope/>} />
        <Route path='/admin' element={<Admin/>}>
          <Route path='profile' element={<Admin/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

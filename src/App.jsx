import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Licences from './components/pages/Licences'
import Cartes from './components/pages/Cartes'
import ChooseLicence from './components/pages/ChooseLicence'

function App() {

  return (
    <div className='m-5'>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<ChooseLicence />}/>
          
          <Route path="/licences" element={<Licences />}/>
          <Route path="/cartes" element={<Cartes />}/>
        </Routes>
      </Router>
    </div>   
  )
}

export default App

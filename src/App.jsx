import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Licences from './components/pages/Licences'
import Cartes from './components/pages/Cartes'
import ChooseLicence from './components/pages/ChooseLicence'
import { useState } from 'react'

function App() {

  const [choosedLicences, setChoosedLicences] = useState([]);

  return (
    <div className='m-5'>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<ChooseLicence choosedLicences={choosedLicences} setChoosedLicences={setChoosedLicences} />}/>

          <Route path="/licences" element={<Licences />}/>
          <Route path="/cartes" element={<Cartes />}/>
        </Routes>
      </Router>
      {choosedLicences.map(licence => 
                <div key={licence.id}>
                    {licence.name}
                    </div>
            )}
    </div>   
  )
}

export default App

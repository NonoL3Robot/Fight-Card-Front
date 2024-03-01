import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Licences } from './components/pages/Licences';
import { Cartes } from './components/pages/Cartes';
import { ChooseLicence } from './components/pages/ChooseLicence';
import { useState } from 'react';
import { Play } from './components/pages/Play';
import { End } from './components/pages/End';
import { Login } from './components/pages/Login.jsx';
import { Register } from './components/pages/Register.jsx';

export const App = () => {
  const [choosedLicences, setChoosedLicences] = useState([]);
  const [scorePlayer, setScorePlayer] = useState(0);
  const [scoreComp, setScoreComp] = useState(0);

  return (
    <div className="m-5">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <ChooseLicence
                choosedLicences={choosedLicences}
                setChoosedLicences={setChoosedLicences}
              />
            }
          />
          <Route
            path="/play"
            element={
              <Play
                licences={choosedLicences}
                scorePlayer={scorePlayer}
                setScorePlayer={setScorePlayer}
                scoreComp={scoreComp}
                setScoreComp={setScoreComp}
              />
            }
          />
          <Route
            path="/end"
            element={<End scorePlayer={scorePlayer} scoreComp={scoreComp} />}
          />
          <Route path="/licences" element={<Licences />} />
          <Route path="/cartes" element={<Cartes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

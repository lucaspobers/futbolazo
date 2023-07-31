import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Login from './components/iniciocomponents/Login'
import Menu from './components/Menu';
import Calendario from './components/menucomponents/Calendario';
import Formacion from './components/menucomponents/Formacion';
import SimulacionPartido from './components/SimulacionPartido';
import Competencias from './components/menucomponents/Competencias';
import Fichajes from './components/menucomponents/Fichajes';
import PlantelesRivales from './components/PlantelesRivales';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path='/competencias' element={<Competencias/>}/>
        <Route path="/formacion" element={<Formacion/>}/>
        <Route path="/calendario" element={<Calendario/>}/>
        <Route path="/partido" element={<SimulacionPartido/>}/>
        <Route path="/fichajes" element={<Fichajes/>}/>
        <Route path="/rivales/:rival" element={<PlantelesRivales/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;



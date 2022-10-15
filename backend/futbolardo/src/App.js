import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Inicio from './components/Inicio';
import Login from './components/iniciocomponents/Login'
import Menu from './components/Menu';
import Calendario from './components/menucomponents/Calendario';
import Formacion from './components/menucomponents/Formacion';
import SimulacionPartido from './components/SimulacionPartido';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Inicio/>}/>
        <Route exact path="/login" element={<Login />}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/formacion" element={<Formacion/>}/>
        <Route path="/calendario" element={<Calendario/>}/>
        <Route path="/partido" element={<SimulacionPartido/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

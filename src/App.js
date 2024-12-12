import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css'
import FooterComponent from './Components/Footer';
import NavBarComponent from './Components/Navbar';
import Cards from './Components/Afiche';
import CrearAfiche from './Components/CrearAfiche';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div id="wrapper">
      <div id='content'>
        <Routes>
          <Route path='/' element={<NavBarComponent/>}>
            <Route path='/' element={<Navigate to="Inicio" replace />} />
            <Route path='Inicio' element={<Cards></Cards>}></Route>
            <Route path='CrearAfiche' element={<CrearAfiche/>}></Route>
          </Route>
        </Routes>
      </div>
      <div id="footer">
      <FooterComponent></FooterComponent>
      </div>
    </div>
   
  );
}

export default App;

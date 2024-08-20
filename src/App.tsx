
import './App.css';

import Earth from "./components/Earth"; // Cambiado a la importación correcta
import NavBar from './components/Navbar';
import Mercurio from './components/Mercurio';
import Venus from './components/Venus';
import Marte from './components/Marte';
import Jupiter from './components/Jupiter';
import Saturn from './components/Saturn';
import Uranus from './components/Uranus';
import Neptune from './components/Neptune';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Earth />
      <Mercurio />
      <Venus />
      <Marte />
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
      

    </div>
  );
}

export default App;
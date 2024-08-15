
import './App.css';

import Earth from "./components/Earth"; // Cambiado a la importación correcta
import NavBar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Earth />
    </div>
  );
}

export default App;
import Home from './pages/Home/Home';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import AcercaDe from './components/AcercaDe/AcercaDe';
import './App.css';

function App() {
  return (
    <div className="App">      
      <ThemeToggle />
      <AcercaDe />
      <Home />
    </div>
  );
}

export default App;

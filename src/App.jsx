import Home from './pages/Home/Home';
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeToggle />
      <Home />
    </div>
  );
}

export default App;

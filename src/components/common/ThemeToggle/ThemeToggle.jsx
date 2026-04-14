import { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  // Inicializar estado con la preferencia guardada o el default del sistema
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Aplicar el tema al cambiar el estado
  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="theme-toggle-container">
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default ThemeToggle;

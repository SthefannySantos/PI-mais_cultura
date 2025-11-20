'use client';

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Atualiza a classe do body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "";
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  return (
    <button 
      onClick={toggleTheme}  aria-label={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
      className="btn btn-primary py-2 position-fixed bottom-0 end-0 m-3"
      style={{zIndex: 9999}}
    >
      {theme === "light" ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-brightness-high-fill"></i>}
    </button>
  );
}

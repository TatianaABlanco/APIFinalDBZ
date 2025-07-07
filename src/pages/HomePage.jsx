import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DragonBallPic from '../assets/portad.jpg';
import '../styles/homepage.css';

function HomePage() {
  useEffect(() => {
    const titulo = document.querySelector('.titulo');
    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      titulo.style.setProperty('--x', `${x}px`);
      titulo.style.setProperty('--y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <div className="titulo">
        <h1>🔥 ¡Kamehameha! Bienvenido al universo de Dragon Ball Super🐉</h1>
        <p>
          💥 Descubre a Goku, Vegeta, Freezer y muchos más en su máximo poder...
          ¡Atrévete a reunir las 7 esferas! 🌟
        </p>

        <Link to="/characters">Ver personajes</Link>
        <img src={DragonBallPic} alt="personajes" />
      </div>
    </>
  );
}

export default HomePage;

import React, { useState } from 'react';
import useDragonBallAPI from '../hooks/useDragonBallAPI';
import Characters from '../components/characters';
import Pagination from '../components/pagination';
import '../styles/characterspage.css';


function CharactersPage() {
  const {
    characters,
    paginationLinks,
    loading,
    error,
    onNext,
    onPrevious,
    resetCharacters,
    searchCharacters,
    isFiltered
  } = useDragonBallAPI();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchCharacters(searchQuery);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    resetCharacters();
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Cargando personajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h2>Error al cargar los datos</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Buscador */}
      <form onSubmit={handleSearch} className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Buscar personaje"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary me-2">Buscar</button>
      </form>

      {/* Botón para volver a la lista completa */}
      {isFiltered && (
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-secondary" onClick={handleReset}>
            Ver todos
          </button>
        </div>
      )}

      {/* Lista de personajes */}
      <Characters characters={characters} />

      {!isFiltered && (
        <Pagination
          previous={paginationLinks.previous}
          next={paginationLinks.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}
    </div>
  );
}

export default CharactersPage;

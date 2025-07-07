import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCharacterDetail from '../hooks/useCharacterDetail';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { character, loading, error } = useCharacterDetail(id);

  if (loading) return <p className="text-center mt-5">Cargando detalles del personaje...</p>;

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>Error: {error.message}</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">
          Volver a la lista
        </button>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center mt-5">
        <p>Personaje no encontrado</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-3" style={{ borderRadius: '15px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="row g-0">
          <div className="col-md-5 text-center">
            <img
              src={character.image}
              alt={character.name}
              className="character-image img-fluid rounded-start p-3"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title">{character.name}</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Ki:</strong> {character.ki}</li>
                <li className="list-group-item"><strong>Max Ki:</strong> {character.maxKi}</li>
                <li className="list-group-item"><strong>Raza:</strong> {character.race}</li>
                <li className="list-group-item"><strong>Género:</strong> {character.gender}</li>
                <li className="list-group-item"><strong>Afiliación:</strong> {character.affiliation}</li>
                <li className="list-group-item"><strong>Descripción:</strong> {character.description}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Planeta de origen */}
        {character.originPlanet && (
          <div className="card mt-4">
            <div className="card-body">
              <h5>🌍 Planeta de Origen: {character.originPlanet.name}</h5>
              <p>{character.originPlanet.description}</p>
              <img
                src={character.originPlanet.image}
                alt={character.originPlanet.name}
                className="img-fluid rounded"
              />
            </div>
          </div>
        )}

        {/* Transformaciones */}
        {character.transformations && character.transformations.length > 0 && (
          <div className="card mt-4">
            <div className="card-body">
              <h5>🔥 Transformaciones</h5>
              <div className="row">
                {character.transformations.map((trans) => (
                  <div key={trans.id} className="col-md-4 mb-3">
                    <div className="card h-100">
                      <img src={trans.image} className="card-img-top" alt={trans.name} />
                      <div className="card-body">
                        <h6 className="card-title">{trans.name}</h6>
                        <p className="card-text">Ki: {trans.ki}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <button onClick={() => navigate('/characters')} className="btn btn-secondary">
            ← Volver a la lista
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;

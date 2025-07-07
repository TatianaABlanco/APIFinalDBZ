import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function Characters({ characters }) {
  const navigate = useNavigate()

  if (!characters || characters.length === 0) {
    return <p className="text-center text-light mt-4">No se encontraron personajes.</p>
  }

  return (
    <div className="row">
      {characters.map((character) => (
        <div key={character.id} className="col-md-4 mb-4">
          <div
            className="card bg-dark text-light h-100 shadow-sm"
            style={{ cursor: 'pointer', borderRadius: '15px' }}
            onClick={() => navigate(`/characters/${character.id}`)}
          >
            <img
              src={character.image}
              alt={character.name}
              className="card-img-top p-3"
              style={{ borderRadius: '1rem', height: '500px' }}
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text mb-1"><strong>Ki:</strong> {character.ki}</p>
              <p className="card-text mb-1"><strong>Max Ki:</strong> {character.maxKi}</p>
              <p className="card-text mb-1"><strong>Raza:</strong> {character.race}</p>
              <p className="card-text mb-1"><strong>Género:</strong> {character.gender}</p>
              <p className="card-text mb-1"><strong>Afiliación:</strong> {character.affiliation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

Characters.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ki: PropTypes.string.isRequired,
      maxKi: PropTypes.string.isRequired,
      race: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      affiliation: PropTypes.string.isRequired,
      deletedAt: PropTypes.any,
    })
  ).isRequired,
}

export default Characters

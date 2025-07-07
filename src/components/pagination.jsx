import PropTypes from 'prop-types'

function Pagination({ previous, next, onPrevious, onNext }) {
  return (
    <ul className='pagination justify-content-center'>
      {previous && (
        <li className='page-item'>
          <button className='page-link' onClick={onPrevious}>Página anterior</button>
        </li>
      )}
      {next && (
        <li className='page-item'>
          <button className='page-link' onClick={onNext}>Página siguiente</button>
        </li>
      )}
    </ul>
  )
}

Pagination.propTypes = {
  previous: PropTypes.string,
  next: PropTypes.string,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default Pagination

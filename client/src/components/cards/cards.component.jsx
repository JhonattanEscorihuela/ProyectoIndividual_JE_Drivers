import { useState } from 'react';

import Card from '../card/card.component'

import './cards.styles.css'

function Cards({ allDrivers }) {
  let itemsPerPage = 9;
  let [currentPage, setCurrentPage] = useState(1);

  

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentDrivers = allDrivers?.slice(indexOfFirstItem, indexOfLastItem);
  let totalPages = Math.ceil(allDrivers?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Limita la cantidad de números de página a mostrar
  const maxPageNumbersToShow = 5; // Puedes ajustar esto según tus necesidades
  const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
  const startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
  const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };


  return (
    <div>
      <div className='card-List'>
        {currentDrivers?.map((driver) => (
          <Card key={driver.id || driver.driver_id} id={driver.id || driver.driver_id}  {...driver} />
        ))}

      </div>
      <div>
        <button onClick={goToFirstPage}>Inicio</button>
        
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(startPage + index)}>
            {startPage + index}
          </button>
        ))}
        
        <button onClick={goToLastPage}>Fin</button>
      </div>
    </div>
  )
}

export default Cards
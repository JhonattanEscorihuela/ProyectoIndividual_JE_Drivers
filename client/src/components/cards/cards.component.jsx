import Card from '../card/card.component'

import './cards.styles.css'

function Cards({ allDrivers }) {

  let driversList = allDrivers;

  return (
    <div className='card-List'>
      {driversList?.map((driver) => (
        <Card key={driver.id || driver.driver_id} id={driver.id || driver.driver_id}  {...driver} />
      ))}
    </div>
  )
}

export default Cards
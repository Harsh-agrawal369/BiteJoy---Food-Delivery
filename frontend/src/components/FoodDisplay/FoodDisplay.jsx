import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top delicacies for you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
            return
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

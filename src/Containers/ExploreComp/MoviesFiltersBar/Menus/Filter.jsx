import React from 'react'
import '../../../../Fontawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RangeInput } from './RangeInput'

export function Filter(props) {
  let { filterClass, filterClassOn, name, filterOn, filterNumber } = props

  function getFilterArrow() {
   return (<FontAwesomeIcon icon={filterOn && filterClassOn ?
        "angle-down" :
        "angle-right"}
        onClick={() => props.toggleFilter(filterNumber)}
      />)
  }

  function getFilterInput() {
    return(<RangeInput
        min={filterClass === 'Year' ? props.minFilterYear : props.minFilterRating}
        max={filterClass === 'Year' ? props.maxFilterYear : props.maxFilterRating}
        filterClass={filterClass}
        filter={name}
        addValueToJson={(value) => { props.addValueToJson(value) }}
        step={props.step}
        value={props.value}
      />)
  }

  return (
    <div onClick={filterClass === 'Year' || filterClass === 'Ratings' ? null : props.filterMovies}
      id={`filter-${name}`}>

      <span id={filterOn && filterClassOn ?
        `filter-${name}-text-hightlight` :
        `filter-${name}-text`}
        onClick={() => props.toggleFilter(filterNumber)}>
        {name}
      </span>

      {filterClass === 'Year' || filterClass === 'Ratings' ? getFilterArrow() : null}
      {(filterOn && filterClass === 'Year') || (filterOn && filterClass === 'Ratings') ? getFilterInput() : null}
    </div>
  )
}
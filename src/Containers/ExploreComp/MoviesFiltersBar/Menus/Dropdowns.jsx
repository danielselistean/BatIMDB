import React from 'react'
import '../Menus.css'
import '../../../../Fontawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Filter } from './Filter'
import dropdowns from './dropdowns.json'

export class Dropdowns extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdowns
        }
    }

    componentWillUnmount() {
        this.setState(dropdowns.map((dropdown => {
            if (dropdown.dropdownOn) {
                return dropdown.dropdownOn = false
            }
        })))
    }

    wrapDropdown(filterComponents, dropdownName, dropdownOn, arrow, i) {
        let wrapedDropdown = <div id={dropdownOn ? `${dropdownName}-filters-display` : `${dropdownName}-filters-hide`} key={i}>
            {filterComponents}
        </div>
        wrapedDropdown = this.wrapDdAndArr(wrapedDropdown, arrow, i)
        return wrapedDropdown
    }

    wrapDdAndArr(wrapedDropdown, arrow, i) {
        let wraper = <div className='dropdown-menu-container' key={i}>
            {arrow}
            {wrapedDropdown}
        </div>
        return wraper
    }

    getDropdownArrow(dropdownName, dropdownOn, i) {
        return <div className="dropdown-menu">
            <p className={dropdownOn ?
                'filterClass-highlight' :
                'filterClass'}>
                {dropdownName}
            </p>

            <FontAwesomeIcon icon={dropdownOn ?
                "angle-down" :
                "angle-right"}
                onClick={() => { this.toggleDropdown(i) }} />
        </div>
    }

    toggleDropdown(i) {
        this.setState([...dropdowns].map((dropdown, idx) => {
            //stop at the target dropdown and toggle it
            if (idx === i) dropdown.dropdownOn = !dropdown.dropdownOn
            return dropdown
        }), () => {
            let newDropdowns = [...this.state.dropdowns]
            if (!newDropdowns[i].dropdownOn) {
                newDropdowns[i].filters.forEach((filter => {
                    filter.filterOn = false
                }))
                console.log(newDropdowns[i].dropdownName)
                this.updateActiveQuery(newDropdowns[i].dropdownName)
            }
            this.setState({ dropdowns: newDropdowns }, () => {
                this.checkActiveFilters()
            })
        })
    }

    updateActiveQuery(name) {
        if (sessionStorage.getItem('activeQuery')) {
            let activeQuery = JSON.parse(sessionStorage.getItem('activeQuery'))
            let hasimdbPropriety = activeQuery.hasOwnProperty('imdbRating')
            if (hasimdbPropriety) {
                delete activeQuery['imdbRating']
            } else {
                delete activeQuery[name]
            }
            sessionStorage.setItem('activeQuery', JSON.stringify(activeQuery))
        }
    }

    toggleFilter(dropdownIdx, filterIdx) {
        let dropdowns = [...this.state.dropdowns]
        dropdowns.forEach((dropdown, i) => {
            // stop at the dropdown that contains the target filter
            if (i === dropdownIdx) {
                dropdown.filters.forEach((filter, idx) => {
                    // toggles the clicked filter
                    if (idx === filterIdx) {
                        filter.filterOn = !filter.filterOn
                        if (!filter.filterOn) {
                            this.updateActiveQuery(dropdown.dropdownName)
                        }
                        // turns off other filter that is on inside that dropdown
                    } else if (idx !== filterIdx && filter.filterOn) {
                        filter.filterOn = !filter.filterOn
                    }
                })
            }
        })

        this.setState([dropdowns], () => {
            this.checkActiveFilters()
        })
    }

    addValueToJson(value, dropdownNr, filterNr) {
        let filter = { ...this.state.dropdowns[dropdownNr].filters[filterNr] }
        filter.value = value

        this.setState(dropdowns.map((dropdown, i) => {
            if (i === dropdownNr) {
                dropdown.filters[filterNr] = filter
            }
            return dropdown
        }), () => {
            this.checkActiveFilters()
        })
    }

    checkActiveFilters() {
        let obj = {}


        this.state.dropdowns.forEach(({ dropdownName, dropdownOn, filters }) => {
            let filterWithInput = dropdownName === 'Year' || dropdownName === 'Ratings'
            if (dropdownOn) {
                filters.forEach(({ filterName, filterOn, value }) => {
                    if (filterOn) {
                        if (filterWithInput) {
                            if (value) {
                                let inputFilterName = dropdownName === 'Ratings' ? 'imdbRating' : dropdownName
                                obj[inputFilterName] = value
                            }
                        } else {
                            obj[dropdownName] = filterName
                        }
                    }
                })
            }
        })
        this.stringifyQuery(obj)
    }

    stringifyQuery(queryObject) {
        if (sessionStorage.getItem('titleQuery')) {
            console.log(sessionStorage.getItem('titleQuery'))
            let titleQuery = sessionStorage.getItem('titleQuery')
            queryObject.Title = titleQuery
        }

        let queryString = ""
        Object.keys(queryObject).forEach(key => {
            queryString += `${key}=${queryObject[key]}&`
            console.log(queryObject[key])
        })
        //slice to remove the last &
        this.sendQuery(queryString.slice(0, -1), queryObject)
    }

    sendQuery(queryString, queryObject) {
        if (queryString === "" && !sessionStorage.getItem('titleQuery')) {
            this.props.getDefaultMovies(true)
        } else {
            sessionStorage.setItem('activeQuery', JSON.stringify(queryObject))
            this.props.filterMovies(queryString)
            this.setCookie(queryString)
        }
    }

    setCookie(queryString) {
        document.cookie = `lastSearch=${queryString};`
    }

    getDropdowns() {
        let dropdownComponents = []
        // i = number of dropdown within dropdowns of the state
        this.state.dropdowns.forEach(({ dropdownOn, dropdownName, filters }, i) => {
            let arrow = this.getDropdownArrow(dropdownName, dropdownOn, i)

            // idx = number of the filter within dropdown
            let filterComponents = filters.map(({ filterName, filterOn, minYear, maxYear, minRating, maxRating, step }, idx) => {
                return (
                    <Filter
                        key={idx}
                        filterClass={dropdownName}
                        filterClassOn={dropdownOn}
                        name={filterName}
                        filterOn={filterOn}
                        // number of the filter within the dropdown array is used as key
                        filterNumber={idx}
                        toggleFilter={(idx) => this.toggleFilter(i, idx)}
                        addValueToJson={(value) => { this.addValueToJson(value, i, idx) }}
                        filterMovies={() => { this.checkActiveFilters() }}

                        minFilterYear={minYear}
                        maxFilterYear={maxYear}
                        minFilterRating={minRating}
                        maxFilterRating={maxRating}
                        step={step}
                    />
                )
            })
            // number of dropdown within the state array is used as key
            let wrapedDropdown = this.wrapDropdown(filterComponents, dropdownName, dropdownOn, arrow, i)
            dropdownComponents.push(wrapedDropdown)
        })

        return dropdownComponents
    }


    render() {
        return (
            <>
                {this.getDropdowns()}
            </>
        )
    }
}
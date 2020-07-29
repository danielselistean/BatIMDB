import React from 'react'
import Menus from './MoviesFiltersBar/Menus'
import MovieCard from '../../Components/MovieCard/MovieCard'
import { withTheme } from 'styled-components';
import './ExploreComp.css'
import Axios from 'axios'

class ExploreComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moviesList: [],
            moviesFound: true,
            noMoreMovies: false,
            moviesAreFiltered: false,
            moviesNumber: 15
        }
    }

    componentDidMount() {
        this.getDefaultMovies()
        sessionStorage.removeItem('activeQuery')
        sessionStorage.removeItem('queryString')
    }

    componentWillUnmount() {
        sessionStorage.removeItem('activeQuery')
    }

    componentDidUpdate() {
        if (this.props.emptySearch && !sessionStorage.getItem('activeQuery')) {
            this.getDefaultMovies()
        } else if (this.props.emptySearch && sessionStorage.getItem('activeQuery')) {
            let activeQueryObj = JSON.parse(sessionStorage.getItem('activeQuery'))
            this.filterMovies(this.processActiveQueryObj(false, activeQueryObj))
        }
    }

    getDefaultMovies(areFiltersOff) {
        // renderNotFound() should not get executed
        if (areFiltersOff) {
            this.setState({ moviesFound: true })
        }
        Axios.get(`http://ancient-caverns-16784.herokuapp.com/movies?take=${this.state.moviesNumber}`)
            .then((response) => {
                let movies = this.addImage(response)
                this.setState({ moviesList: movies })
                this.setState({ moviesAreFiltered: false })
            })
    }

    addImage(response) {
        let movies = response.data.results.map((movie) => {
            if (movie.Poster === 'N/A') {
                movie.Poster = 'https://static.posters.cz/image/750/postere/justice-league-batman-solo-i50997.jpg'
            }
            return movie
        })
        return movies
    }

    filterMovies(query) {
        console.log(query)
        sessionStorage.setItem('queryString', query)
        Axios.get(`http://ancient-caverns-16784.herokuapp.com/movies?${query}`)
            .then((response) => {
                let movies = this.addImage(response)
                this.setState({ moviesList: movies }, () => {
                    if (this.state.moviesList.length < 1) {
                        this.setState({ moviesFound: false, moviesAreFiltered: true, moviesNumber: 15 })
                    } else {
                        this.setState({ moviesFound: true, moviesAreFiltered: true, moviesNumber: 15 })
                    }
                })
            })
    }

    isSearchByTitle() {
        if (localStorage.getItem('search')) {
            if (sessionStorage.getItem('activeQuery')) {
                let activeQueryObj = JSON.parse(sessionStorage.getItem('activeQuery'))
                this.filterMovies(this.processActiveQueryObj(true, activeQueryObj))
            } else {
                let titleQuery = this.getTitle()
                this.filterMovies(`Title=${titleQuery}`)
            }
        }
    }

    processActiveQueryObj(isTitle, activeQueryObj) {
        if (isTitle) {
            activeQueryObj.Title = this.getTitle()
            sessionStorage.setItem('activeQuery', JSON.stringify(activeQueryObj))
        }

        let queryString = ""
        Object.keys(activeQueryObj).forEach(key => {
            queryString += `${key}=${activeQueryObj[key]}&`
        })

        // returns the queryString without the last &
        return queryString.slice(0, -1)
    }

    getTitle() {
        let title = localStorage.getItem('search') //// null if empty
        sessionStorage.setItem('titleQuery', title)
        localStorage.removeItem('search')
        console.log('getTitle function', title) //// returns null if last letter deleted
        return title
    }

    setCookie(activeQuery) {
        document.cookie = `lastSearch=${activeQuery};`
    }

    renderNotFound() {
        return (
            <>
                <div>
                    <img src="https://image.flaticon.com/icons/svg/1178/1178479.svg" style={{ width: '10rem', height: '11rem' }} alt="not found" />
                </div>
            </>
        )
    }
    renderMovies() {
        const { auth, token } = this.props;
        let movies = this.state.moviesList.map(movie => {
            return (<MovieCard
                key={movie._id}
                id={movie._id}
                poster={movie.Poster}
                title={movie.Title}
                imdbRating={movie.imdbRating}
                imdbID={movie.imdbID}
                auth={auth}
                token={token}
            />)
        })
        return movies
    }
    getMoreMovies() {
        //let updatedMoviesNumber = parseInt(this.state.skip)+15
        //console.log(updatedMoviesNumber)
        this.setState({ moviesNumber: this.state.moviesNumber + 15 }, () => {
            console.log('more movies')
            if (this.state.moviesNumber < 105) {
                this.getDefaultMovies()
                this.removeActiveQuery()
            } else {
                this.setState({ noMoreMovies: true })
                this.removeActiveQuery()
            }
        })
    }
    removeActiveQuery() {
        if (sessionStorage.getItem('activeQuery')) sessionStorage.removeItem('activeQuery')
    }
    render() {
        return (
            <div className="exploreComp-container"
                style={{ backgroundColor: this.props.theme.colorBackground.primary }}
            >
                <Menus
                    filterMovies={(query) => this.filterMovies(query)}
                    getDefaultMovies={(areFiltersOff) => this.getDefaultMovies(areFiltersOff)}
                />
                <div className="filtered-movies-container">
                    {this.state.moviesFound ? this.renderMovies() : this.renderNotFound()}
                    {this.isSearchByTitle()}
                </div>
                {this.state.noMoreMovies || this.state.moviesAreFiltered ? null : <p id="more" onClick={() => this.getMoreMovies()}>MORE</p>}
            </div>
        )
    }
}
export default withTheme(ExploreComp)
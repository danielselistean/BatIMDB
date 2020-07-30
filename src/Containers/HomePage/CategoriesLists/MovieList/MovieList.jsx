import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import MovieCard from '../../../../Components/MovieCard/MovieCard'
import './MovieList.css'
import axios from 'axios'

class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moviesList: []
        }
        this.breakPoints = [
            { width: 1, itemsToShow: 1, itemsToScroll: 1 },
            { width: 460, itemsToShow: 2, itemsToScroll: 1 },
            { width: 708, itemsToShow: 3, itemsToScroll: 1 },
            { width: 908, itemsToShow: 4, itemsToScroll: 1 },
        ]
    }

    componentDidMount() {
        this.getMoviesList();
    }

    getMoviesList = () => {
        axios.get(`https://movies-app-siit.herokuapp.com/movies?Type=${this.props.type}&take=100`)
            .then((response) => {
                // console.log(response.data.results)
                let movies = this.addImage(response)
                this.setState({
                    // moviesList: response.data.results
                    moviesList: movies
                })
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

    render() {
        const { auth, token } = this.props;
        let { moviesList } = this.state
        let movies = moviesList.map(movie => {
            return (
                <MovieCard
                    key={movie._id}
                    id={movie._id}
                    poster={movie.Poster}
                    title={movie.Title}
                    imdbRating={movie.imdbRating}
                    imdbID={movie.imdbID}
                    auth={auth}
                    token={token}
                    type={movie.Type}
                />
            )
        });

        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
            }} >
                <Carousel
                    breakPoints={this.breakPoints}
                    itemsToShow={5}
                    itemsToScroll={1}
                    initialFirstItem={4}
                    renderPagination={() => {
                        return (
                            <> </>
                        )
                    }}
                >
                    {movies}
                </Carousel>

            </div>
        )
    }
}
export default MovieList;

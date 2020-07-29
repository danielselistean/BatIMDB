import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./MovieItem.css";

class MovieItem extends Component {

    movieDetailsFunction = () => {
        this.props.history.push(
            {
                pathname: '/movieDetails',
                state: this.props.imdbID
            }
        );
    }

    render() {
        
        const { poster, title, imdbRating } = this.props
        return (
            <div className='movieItem'>
                <img src={poster} alt="movie poster" className='movieImg' />
                <p className='movieTitle'>{title}</p>
                <p className='movieRating'>RATING: {imdbRating}</p>
                <div className='nextLevel'></div>
                <button className='movieDetailsBtn' onClick={this.movieDetailsFunction}>VIEW </button>
            </div>
        )
    }
}

export default withRouter(MovieItem);
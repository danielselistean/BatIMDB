import React from 'react';
import './MovieDetails.css';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import RespPlayer from '../HomePage/DinamicComp/RespPlayer/RespPlayer';
import Axios from 'axios';


class MovieDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieDetail: []
        }
    }

    editMovie = () => {
        // console.log('this.props aici',this.props.location.state)
        if (this.props.auth) {
            this.props.history.push({
                pathname: `/editPage/${this.props.location.state.id}`,
            });
        } else {
            window.alert('You have to be signed in to Edit Movies')
        }
    }

    componentDidMount() {
        this.getMovieDetails();
    }

    getMovieDetails = () => {
        Axios.get(`http://movies-app-siit.herokuapp.com/movies/${this.props.history.location.state.id}`)
            .then((response) => {
                //console.log(response.data);
                this.setState({ movieDetail: response.data })
            })
    }

    render() {
        const editClass = this.props.auth ? 'enabledEdit' : 'disabledEdit';
        const { Poster, Title, Genre, Year, Runtime, imdbRating, Language, Country, Director, Actors, Released, Awards, Plot } = this.state.movieDetail
        return (
            <div
                className="movieDetails-container"
                style={{backgroundColor: this.props.theme.colorBackground.primary }}
            >
                <div className="movieDetailsImg">
                    <img src={Poster} alt="movie poster" className='detailsImg' /><br />
                    <div className='trailer'>
                        <RespPlayer id={this.props.history.location.state.imdbID} />
                    </div>

                </div>
                <div className="movieDetailsInfo" >
                    <p className="infoTitle"><b>Title:</b> {Title}</p><br />
                    <p className="infoGenre"><b>Genre:</b> {Genre}</p><br />
                    <p className="infoYear"><b>Year:</b>  {Year}</p><br />
                    <p className="infoRuntime"><b>Runtime:</b> {Runtime}</p><br />
                    <p className="infoImdbRating"><b>ImdbRating:</b> {imdbRating}</p><br />
                    <p className="infoLanguage"><b>Language:</b> {Language}</p><br />
                    <p className="infoCountry"><b>Country:</b> {Country}</p><br />
                    <p className="infoDirector"><b>Director:</b> {Director}</p><br />
                    <p className="infoActors"><b>Actors:</b> {Actors}</p><br />
                    <p className="infoRelease"><b>Released:</b> {Released}</p><br />
                    <p className="infoAwards"><b>Awards:</b> {Awards}</p><br />
                    <br />
                    <p className="infoPlot"><i>{Plot}</i> </p><br />
                    <br /><br />
                    <div className="movieDetails-buttons">
                        <button className={editClass} onClick={this.editMovie}>EDIT MOVIE</button><br />
                    </div>

                </div>
            </div>
        )
    }
}

export default withTheme(withRouter(MovieDetails))
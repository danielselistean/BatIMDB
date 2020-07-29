import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import axios from 'axios';
import RotateList from 'react-rotate-list';
import SingleMovie from '../DinamicComp/SingleMovie/SingleMovie';
import './DinamicComp.css';
import { Fragment } from 'react';
import Picture from './Picture/Picture';
import ReactModal from 'react-modal';
import RespPlayer from '../DinamicComp/RespPlayer/RespPlayer';


ReactModal.setAppElement(document.getElementById('root'));
class DinamicComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            showModal: false,
            id: '',
        };
    }

    componentDidMount() {
        this.getMovies();
    }

    getMovies = () => {
        axios.get('https://movies-app-siit.herokuapp.com/movies?Type=movie&take=100').then(response => {
            this.sortArray(response.data.results);
        })
            .catch(err => {
                console.log(err);
            });
    }

    showPoster = () => {
        const picsAndIds = [];
        this.state.movies.map((movie, idx) => {
            picsAndIds.push({
                pic: movie.Poster,
                id: movie.imdbID,
            })
        })

        if (picsAndIds.length) {
            return (
                <Picture
                    picsAndIdsArray={picsAndIds}
                    key={this.state.movies._id}
                    functionModal={e => this.handleOpenModal(e)}
                />
            )
        }
    }

    sortArray = array => {
        const arraySorted = array.sort(function (a, b) {
            return Number(b.imdbVotes) - Number(a.imdbVotes);

        });
        this.setState({
            movies: arraySorted.slice(0, 10)
        })
    }

    handleOpenModal = id => {
        this.setState({ showModal: true, id: id });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        let movies = this.state.movies.map((movie, idx) => {
            return (
                <SingleMovie
                    title={movie.Title}
                    key={movie._id}
                    year={movie.Year}
                    poster={movie.Poster}
                    runtime={movie.Runtime}
                    index={idx}
                    imdbID={movie.imdbID}
                    functionModal={e => this.handleOpenModal(e)}
                    imdbRating={movie.imdbRating}
                />
            )
        });
        return (          
            <Fragment >                
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={() => this.handleCloseModal()}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <a 
                        style={{
                            cursor: "pointer",
                            position: "relative",
                            zIndex: "1",
                            color: "white",
                            fontWeight: "bolder",
                            left: "25px",
                            top: "35px"
                        }} 
                        onClick={this.handleCloseModal}
                    >close</a>
                    <RespPlayer id={this.state.id} />
                </ReactModal>
                <div className="DinamicCompMovies"
                     style={{backgroundColor: this.props.theme.colorBackground.primary }}
                >
                    <div className="DinamicCompMoviesList">
                        <RotateList height={700} autoplay={true} duration={900} delay={5000}>
                            {movies}
                        </RotateList>
                    </div>
                    <div className="DinamicCompMoviesPicture">
                        {this.showPoster()}
                    </div>
                </div>
            </Fragment>           
        )
    }
}

export default withTheme(DinamicComp);




// import { withTheme } from 'styled-components';
// style={{color: this.props.theme.fontColor.primary }}   -black
// style={{color: this.props.theme.fontColor.secondary }}  -yelow
// style={{backgroundColor: this.props.theme.colorBackground.primary }}
// style={{color: this.props.theme.shadows.shadow1 }} 
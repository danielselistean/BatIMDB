import React from 'react';
import { withTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';
import { withRouter } from 'react-router-dom';

class MovieCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
        }
    }
    //logic for log/reg invitation
    handleHover = () => {
        this.setState({ hover: true })
    }
    handleMouseLeave = () => {
        this.setState({ hover: false })
    }


    editMovie = () => {
        this.props.history.push(
            {
                pathname: `/editPage/${this.props.id}`,
            }
        );
    }

    movieDetails = () => {
        this.props.history.push(
            {
                pathname: `/movieDetails/${this.props.id}`,
                state: {
                    id: this.props.id,
                    imdbID: this.props.imdbID
                }
            }
        );
    }

    render() {
        const { poster, title, imdbRating } = this.props;
        return (
            <div
                className='movieCard'
                // style={{ backgroundColor: this.props.theme.colorBackground.nav }}         
            >
                {/* <img src={ poster } alt="movie poster" className='cardImg' /> */}
                <div style={{ backgroundImage: "url(" + poster + ")" }} className='cardImg' />
                <p className='cardTitle'>{title}</p>
                <div className='ratingsWrapper'>
                    <FontAwesomeIcon icon={faStar} className="star" />
                    <span className='cardRating'> {imdbRating}</span>
                </div>

                {!this.state.hover && !this.props.auth &&
                    <div className='closedCardInvite'
                        onMouseEnter={this.handleHover}>
                    </div>
                }
                {this.state.hover && !this.props.auth &&
                    <div className='openCardInvite'
                        onMouseLeave={this.handleMouseLeave}>
                        <p className='inCardInvite'>login / register to edit</p>
                    </div>
                }
                {this.props.auth &&
                    <button className='editBtn' onClick={this.editMovie}>EDIT</button>
                }
                <button className='movieDetailsButn' onClick={this.movieDetails}>VIEW </button>
            </div>
        )
    }
}

export default withTheme(withRouter(MovieCard));
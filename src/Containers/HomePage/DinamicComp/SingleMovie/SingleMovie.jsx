import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import ImdbRating from '../ImdbRating/ImdbRating';
import "./SingleMovie.css";


class SingleMovie extends Component {
    render() {
        return (
            <div className="DinamicSingleMovie">
                <a onClick={()=> this.props.functionModal(this.props.imdbID)} >
                    <img className="DinamicSingleMovieImg" src={this.props.poster} />
                </a>                
                <div 
                    className="DinamicInfo">
                    <p style={{color: this.props.theme.fontColor.primary }}>{this.props.runtime}</p>
                    <p style={{color: this.props.theme.fontColor.secondary }}>{this.props.title}</p>
                    <p style={{color: this.props.theme.fontColor.primary }}>{this.props.year}</p>
                    <ImdbRating
                        mImdbID={this.props.imdbID}
                        Rating={this.props.imdbRating}>
                    </ImdbRating>
                </div>
            </div>
        )
    }
}

export default withTheme(SingleMovie);
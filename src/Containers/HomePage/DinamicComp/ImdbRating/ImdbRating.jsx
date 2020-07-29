import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../Fontawesome/fontawesome';
import { withTheme } from 'styled-components';

class ImdbRating extends Component {

    render() {
        const mystyle = {
            
            rating: {
                marginTop: "3px",
                color: this.props.theme.fontColor.primary,
                textAlign: "center",
            },
            star: {
                color: this.props.theme.fontColor.secondary,
            }
        }
        return (
            <span data-title={this.props.mImdbID}>
                <img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_37x18.png" />
                &nbsp;&nbsp;
                < span style={mystyle.rating} >
                    {this.props.Rating}&nbsp;/&nbsp;10 &nbsp;
            < FontAwesomeIcon
                        icon="star"
                        style={mystyle.star} />
                </span >
            </span >
        )
    }
}

export default  withTheme(ImdbRating);



{/* <a href={`https://www.imdb.com/title/${this.props.mImdbID}/?ref_=plg_rt_1`}>
                    <img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" />
                </a>&nbsp;&nbsp; */}
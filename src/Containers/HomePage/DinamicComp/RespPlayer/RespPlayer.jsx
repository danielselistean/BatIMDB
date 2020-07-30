import React, { Component } from 'react';
import IframeResizer from 'iframe-resizer-react'
import axios from 'axios';
const url1 = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/';

class RespPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieLink: '',
        }
    }

    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();
    //abortController = new AbortController();

    componentDidMount() {
        this.getTrailers();
    }

    componentWillUnmount() {
        this.source.cancel("Operation canceled by the user.");
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.getTrailers();
        }
    }

    getTrailers = () => {
        axios.get(`${url1}${this.props.id}`, {
            cancelToken: this.source.token,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "39e0716dd6msh6895a8cc9fab348p147cc0jsn4373e11f60f4",
            }
        })
            .then(response => {
                this.setState({ movieLink: response.data.trailer.id })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <IframeResizer
                /* log */
                src={`https://www.imdb.com/videoembed/${this.state.movieLink}`}
                style={{                  

                    minWidth: '100%',
                    height: '720px',
                    maxHeight: '100%'
                }}
                checkOrigin={false}
                autoResize={true}
                allowFullScreen={true} 
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
            />
        )
    }
}

export default RespPlayer;
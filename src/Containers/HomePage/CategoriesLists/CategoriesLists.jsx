import React from 'react'
import MovieList from '../CategoriesLists/MovieList/MovieList';
import { withTheme } from 'styled-components';
import './CategoriesLists.css'

class CategoriesLists extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { auth, token } = this.props;

        return (
            <div style={{ width: "98%" }}>
                <h1 style={{ color: this.props.theme.fontColor.secondary }}>MOVIES</h1><br />
                <div  >
                    <MovieList
                        type='movie'
                        auth={auth}
                        token={token}
                    />
                </div>
                <h1 style={{ color: this.props.theme.fontColor.secondary }}>SERIES</h1><br />
                <div >
                    <MovieList
                        type='series'
                        auth={auth}
                        token={token}
                    />
                </div>
                <h1 style={{ color: this.props.theme.fontColor.secondary }}>GAMES</h1><br />
                <div >
                    <MovieList
                        type='game'
                        auth={auth}
                        token={token}
                    />
                </div>
            </div>
        )
    }
}

export default withTheme(CategoriesLists);

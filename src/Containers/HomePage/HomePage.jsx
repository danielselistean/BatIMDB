import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import MediaQuery from 'react-responsive'
import DinamicComp from '../HomePage/DinamicComp/DinamicComp';
import Flash from '../../Theme/Styledcomponents/Flash';
import './HomePage.css';
import CategoriesLists from '../HomePage/CategoriesLists/CategoriesLists'


class HomePage extends Component {
    render() {
        const auth = this.props.auth;
        const token = this.props.token;
        const mediaFrames = (
            <Fragment>
                <MediaQuery maxDeviceWidth={1960} minDeviceWidth={961}>
                    <img className="frame" src={this.props.theme.frameShort} />
                </MediaQuery>
                <MediaQuery maxDeviceWidth={960}>
                    <img className="frame" src={this.props.theme.frameLong} />
                </MediaQuery>
            </Fragment>
        )
    
        return (
            <div
                className="Hompage"
                style={{ backgroundColor: this.props.theme.colorBackground.primary }}
            >
                <Flash className="flash">
                    <h1 style={{
                        color: this.props.theme.fontColor.secondary,
                        marginTop: "25px"
                    }}>
                        10 most voted Batman movies
                    </h1>
                </Flash>
                <div
                    className="dinamicComp"
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "15px",
                        marginBottom: "15px"
                    }}
                >
                    {mediaFrames}
                    <DinamicComp />
                    {mediaFrames}
                </div>
                <CategoriesLists
                    auth={auth}
                    token={token}
                />
                <br />

            </div>
        );
    }
}

export default withTheme(withRouter(HomePage));
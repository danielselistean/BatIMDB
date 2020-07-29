import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import 'fontsource-roboto';
import axios from 'axios';
import './Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import RegisterForm from './Register/Register'
import LoginForm from './Login/Login'


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            regForm: false,
            logForm: false,
            logOut: false,
        }
    }
    /* componentDidUpdate () */

    exploreFunction = (searchIsEmpty) => {
        if (searchIsEmpty) {
            this.props.handleEmptySearch()
            this.props.history.push('/explore');
        } else {
            this.props.history.push('/explore');
            // this.props.history.push({obj: path, cale, state})
            //console.log('auth pe state header dupa log-refresh-click:', this.state.auth)
        }
    }

    hompageFunction = () => {
        this.props.history.push(
            {
                pathname: '/hompage',
                state: this.props.location.pathname
            }
        );
    }
    //logic for header AddBtn
    addPageFunction = () => {
        if (this.props.auth) {
            this.props.history.push({
                pathname: '/addPage',
            });
        } else {
            window.alert('you have to be signed in to add movies')
        }
    }
    // logic for register/login/cancelForm Btns 
    handleRegisterBtnClick = () => {
        this.setState({
            regForm: true,
            logForm: false
        })
    }
    handleLoginBtnClick = () => {
        this.setState({
            logForm: true,
            regForm: false
        })
    }
    handleCancelBtn = () => {
        this.setState({ logForm: false, regForm: false })
    }

    //logic for submit register/login => auth, token, user on MyImdb.state + enable/disable forms in header
    handleSubmitRegister = (data, user) => {
        this.props.onSubmitLog(data, user);
        if (this.props.auth) {
            this.setState({
                regForm: false
            })
        }
    }
    handleSubmitLogin = (data, user) => {
        this.props.onSubmitLog(data, user);
        if (this.props.auth) {
            this.setState({
                logForm: false
            })
        }
    }
    //logic for logout section  /  opens logout option
    handleHelloBtnClick = () => {
        this.state.logOut ? this.setState({ logOut: false }) : this.setState({ logOut: true });
    }
    //logs out from server
    handleLogOutBtnClk = () => {
        //console.log(this.props.token)
        const headerToken = { headers: { 'X-Auth-Token': this.props.token } };

        axios.get(
            'https://movies-app-siit.herokuapp.com/auth/logout',
            headerToken
        ).then(response => {
            console.log("success logout response:", response)
            if (response.status === 200) {
                this.props.onLogout();
            }
        }).catch(error => {
            console.log("logout error msg:", error)
        })
    }

    storeSeach = (event) => {
        console.log('storeSearch function value', event.target.value) ///
        if (event.target.value === '') {
            this.updateActiveQuery()
            this.exploreFunction(true)
        } else {
            localStorage.setItem('search', event.target.value)
            this.exploreFunction()
            this.props.history.push(`/explore/${event.target.value}`)
        }
    }

    updateActiveQuery() {
        console.log('update function')
        sessionStorage.removeItem('titleQuery')

        if (sessionStorage.getItem('activeQuery')) {
            let activeQuery = JSON.parse(sessionStorage.getItem('activeQuery'))
            delete activeQuery['Title']
            sessionStorage.setItem('activeQuery', JSON.stringify(activeQuery))
        }
    }

    render() {
        /* console.log('props history la header,', this.props) */
        const addClass = this.props.auth ? 'enabledAdd' : 'disabledAdd';
        return (
            <div className='header'
            //  style={{
            //      backgroundColor: this.props.theme.colorBackground.nav,
            //      boxShadow: this.props.theme.shadows.boxShadow1
            //     }}
            >
                {/* <div className='top'></div> */}
                <nav className='navBar'
                //style={{backgroundColor: this.props.theme.colorBackground.nav }}
                >
                    <img
                        className='logo'
                        alt='logo'
                        src={require('../Images/logo.png')}
                        onClick={this.hompageFunction}
                    />
                    <button
                        className='exploreBtn'
                        onClick={this.exploreFunction}> EXPLORE </button>
                    <button className={addClass}
                        onClick={this.addPageFunction}> ADD MOVIE </button>
                    <div className='searchBar'>
                        <span className="search-input-container">
                            <FontAwesomeIcon icon={faSearch} />
                            <input type='search' className='searchInput' onChange={(event) => this.storeSeach(event)} placeholder="search by title..." />
                        </span>
                        {/*<button className='searchBtn' value="search">Search</button>*/}
                    </div>
                    <a
                        style={{ cursor: "pointer" }}
                        onClick={() => this.props.themeFunction()}  //in lucru - am comentat-o sa nu va incurce ****** Marius
                    >
                        <img
                            className='mood'
                            alt='mood'
                            src={require('../Images/moon-yellow.png')}
                        />
                    </a>

                    {!this.props.auth &&
                        <div className='buttonsLogReg'>
                            <button className='registerBtn'
                                onClick={() => this.handleRegisterBtnClick()}> REGISTER </button>
                            <button className='loginBtn'
                                onClick={() => this.handleLoginBtnClick()}> LOGIN </button>

                            {this.state.regForm && < RegisterForm
                                auth={this.props.auth}
                                onSubmitRegister={this.handleSubmitRegister}
                                onCancel={this.handleCancelBtn}
                            />
                            }
                            {this.state.logForm && < LoginForm
                                auth={this.props.auth}
                                onSubmitLogin={this.handleSubmitLogin}
                                onCancel={this.handleCancelBtn}
                                reReg={this.handleRegisterBtnClick}
                            />
                            }
                        </div>
                    }

                    {this.props.auth &&
                        <div className='logOut'>
                            <button className='helloBtn'
                                onClick={() => this.handleHelloBtnClick()}> Welcome, {this.props.user} ^ </button>
                            {this.state.logOut &&
                                <button className='logOutBtn'
                                    onClick={() => this.handleLogOutBtnClk()}> Logout </button>
                            }
                        </div>

                    }
                </nav>
            </div>
        )
    }
}
export default withTheme(withRouter(Header));

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import {fade, makeStyles} from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// // import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(1),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

// export default function Header() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//               <Avatar alt="logo" src="." />
//             {/* <MenuIcon /> */}
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             Material-UI
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
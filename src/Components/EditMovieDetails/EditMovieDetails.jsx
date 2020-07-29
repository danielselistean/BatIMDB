import React from 'react';
import './EditMovieDetails.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class EditMovieDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            runtime: '',
            imdbRating: '',
            year: '',
            plot: '',
            awards: '',
            director: '',
            actors: '',
            released: '',
            genre: '',
            poster: '',
        }
    }
    componentDidMount = () => {
        const { _id, Title,
            // Runtime, imdbRating, Year, Plot, Awards, Director, Actors, Released, Genre, poster 
        } = this.props.movieDetail;

        this.setState({
            id: _id,
            title: Title,
            ...this.props.movieDetail,
        });
    }

    handleChange(key) {
        return (event) => {
            console.log('event.target.value: ', event.target.value)
            this.setState({ [key]: event.target.value })
        }
    }

    updateMovie = async () => {
        try {
            const accessToken = {
                headers: { 'X-Auth-Token': this.props.token }
            };
            const response = await axios.put(
                `https://movies-app-siit.herokuapp.com/movies/${this.state.id}`,
                {
                    Title: this.state.Title,
                    Runtime: this.state.Runtime,
                    imdbRating: this.state.imdbRating,
                    Year: this.state.Year,
                    Plot: this.state.Plot,
                    Awards: this.state.Awards,
                    Director: this.state.Director,
                    Actors: this.state.Actors,
                    Released: this.state.Released,
                    Genre: this.state.Genre,
                    Poster: this.state.Poster,
                },
                accessToken
            )
            this.props.history.goBack();
            console.log('response data de la updateMovie', response.data)
            // return response.data;
        }
        catch (error) {
            console.log('aici e eroarea de la catch', error)
            this.setState({ error: error });
        }

    }

    saveMovie = (e) => {
        e.preventDefault();
        this.updateMovie();
        console.log('this.state ', this.state);
    }
    handleBack = (e) => {
        e.preventDefault()
        this.props.history.goBack();
    }
    handleDeleteMovie = (e) => { 
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this item?')){ 
            this.deleteMovieById();
        }
    }
    deleteMovieById = async () => {
        try {
            console.log('id is:', this.state.id);
            // e.preventDefault();
            const optionsToken = {
                headers: { 'X-Auth-Token': this.props.token }
            };
            const response = await axios.delete(
                `https://movies-app-siit.herokuapp.com/movies/${this.state.id}`,
                optionsToken
            );
            console.log('response data de la deleteMovieById', response.data);
            this.props.history.push('/hompage');
            
        }
        catch (error) {
            this.setState({ error: error });
            console.log('DELETE: aici e eroarea de la catch', error)
        }
    }

    renderInput = (fieldName, labelName) => {
        return (
            <div className='editField'>
                <label className='editLabel' >{labelName}</label>
                <input
                    type='text'
                    name={fieldName}
                    className='editInput'
                    defaultValue={this.state[fieldName]}
                    onChange={this.handleChange(fieldName)}
                />
            </div>
        );
    }

    render() {
        // console.log('this.state here: ',this.state);
        return (
            <form className='editForm'>
                <div className='editDetailsInputsDiv'>
                    {this.renderInput('Title', 'Edit Title')}
                    {this.renderInput('Genre', 'Edit genre')}
                    {this.renderInput('Poster', 'Edit Poster')}
                    {this.renderInput('Year', 'Edit Year')}
                    {this.renderInput('Runtime', 'Edit Runtime')}
                    {this.renderInput('imdbRating', 'Edit Rating')}
                    {this.renderInput('Language', 'Edit Language')}
                    {this.renderInput('Country', 'Edit Country')}
                    {this.renderInput('Awards', 'Edit Awards')}
                    {this.renderInput('Actors', 'Edit Actors')}
                    {this.renderInput('Director', 'Edit Director')}
                    {this.renderInput('Released', 'Edit released')}

                    <div className='editField'>
                        <label className='editLabel' htmlFor='plot'>Edit Plot</label>
                        <textarea
                            className='editInput'
                            type='text'
                            name='Plot'
                            defaultValue={this.state.Plot}
                            onChange={this.handleChange('Plot')}
                            rows="4"
                            cols="50"
                        >
                            {this.state.Plot}
                        </textarea>
                    </div>

                </div>

                <div className='btnsDiv'>
                    <button className='btn'
                        onClick={this.handleBack}
                    >
                        BACK
                    </button>
                    <button
                        type='submit'
                        className='btn'
                        onClick={this.saveMovie}
                    >
                        SAVE
                    </button>
                    <button
                        type='submit'
                        className='btn'
                        onClick={this.handleDeleteMovie}
                    >
                        DELETE
                    </button>
                </div>
            </form>
        )
    }
}

export default withRouter(EditMovieDetails);


// eslint-disable-next-line no-lone-blocks
{/* <div className='addPoster'>
                        {/* <label style={{ color: 'black' }} htmlFor='addPoster'>Poster URL:</label>
                        <input type='text'
                            name='imageUrl'
                            className='addField addPosterField'
                            value={Poster}
                            onChange={this.handleChange('poster')}
/> */}
//varianta initiala
 // divForUpdate=(type)=> {
    //     return (
    //         <div className='fieldWrapper'>
    //             <label htmlFor='(type)'>`${type}`:</label>
    //             <input
    //                 type='text'
    //                 name='`${type}`'
    //                 className='addField'
    //                 defaultValue={type}
    //                 onChange={this.handleChange(`${type`)}
    //             />
    //         </div>
    //     )
    // }

    //=======varianta cu then=======
        //updateMovie = () => {
        // const tokenX = {
        //     headers: { 'X-Auth-Token': this.props.token }
        // };
        // axios.put(
        //     `https://movies-app-siit.herokuapp.com/movies/${this.state.id}`,
        //     {
        //         Title: this.state.Title,
        //         Runtime: this.state.Runtime,
        //         imdbRating: this.state.imdbRating,
        //         Year: this.state.Year,
        //         Plot: this.state.Plot,
        //         Awards: this.state.Awards,
        //         Director: this.state.Director,
        //         Actors: this.state.Actors,
        //         Released: this.state.Released,
        //         Genre: this.state.Genre,
        //         Poster: this.state.Poster,
        //     },
        //     tokenX
        // ).then(response => {
        //     console.log('aici e response dupa then:  ', response);
        //     this.props.history.goBack();

        // }).catch(error => {
        //     console.log('aici e eroarea de la catch', error)
        // })
        //}

        // deleteEditButton = (e) => {
        //     console.log(this.state.id);
        //     e.preventDefault();
        //     const options = {
        //         headers: { 'X-Auth-Token': this.props.token }
        //     };
        //     axios.delete(
        //         `https://movies-app-siit.herokuapp.com/movies/${this.state.id}`,
        //         options
        //     ).then(() => {
        //         this.props.history.goBack();
        //     }).catch(error => {
        //         console.log('DELETE: aici e eroarea de la catch', error)
        //     })
        // }
        //---------after delete movie chose path---
        // this.props.history.push(`/editPage/${this.props.id}`)
            //     ?
            //     this.props.history.goBack()
            //     :
            //     this.props.history.push('/hompage')
            // return response.data;
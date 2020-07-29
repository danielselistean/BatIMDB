import React from 'react';
import { withTheme } from 'styled-components';
import axios from 'axios';
import Bounce from '../../Theme/Styledcomponents/Bounce';
import { createClassName } from '../../utilitary';
import './AddNewMovie.css';

class AddNewMovie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            preview: false,
            noBatman: false,
            title: '',
            year: '',
            rating: '',
            type: '',
            language: '',
            genre: '',
            plot: '',
            actors: '',
            director: '',
            awards: '',
            imgUrl: 'https://i.pinimg.com/originals/31/d6/fb/31d6fb7595b44e4b649aec2ce079e68a.jpg'
        }
    }
    //collects input data on state
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            noBatman: false
        })
    }
    //validates the batman title
    isBatmanTitle = () => {
        const { title } = this.state;
        return title.includes('Batman') || title.includes('batman');
    }
    //renders preview if is batman movie
    handlePreview = (event) => {
        event.preventDefault();
        this.isBatmanTitle() ? this.setState({ preview: true }) : this.setState({ noBatman: true })
    }
    //handles the fetch
    addMovie = async () => {
        const { title, year, imdbID, type, imageUrl } = this.state;
        const headerToken = {
            headers: { 'X-Auth-Token': this.props.token }
        };

        const response = await axios.post(
            'https://movies-app-siit.herokuapp.com/movies',
            {
                Title: title,
                Year: year,
                imdbID: imdbID,
                Type: type,
                Poster: imageUrl
            },
            headerToken
        )
        if (response.status === 200) {
            this.setState({
                preview: false
            })
            this.props.onSubmitAdd()
        } else {
            window.alert('There has been a server error. Try again!')
        }

    }
    //on success closes preview, sends success msg to be rendered on AddPage | error: no batman movie/server error
    handleSubmit = (event) => {
        event.preventDefault();
        this.isBatmanTitle() ? this.addMovie() : this.setState({ noBatman: true })
    }
    //creates preview section (label + text)
    renderPreview(value, labelName) {
        const theme = this.props.theme.type;
        return (
            <p className={createClassName(theme, 'pvwLine')}>
                <span className={createClassName(theme)}
                >{labelName}</span>
                {this.state[value]}
            </p>
        )
    }
    //creates input section (label + input)
    renderInput = (fieldName, labelName, required) => {
        if (required) {
            labelName += ' *';
        }
        const theme = this.props.theme.type;
        return (
            <div className='fieldWrapper'>
                <label htmlFor={fieldName}
                    className={createClassName(theme, 'inputLabel')}>{labelName}</label>
                <input
                    type='text'
                    name={fieldName}
                    id={fieldName}
                    className={createClassName(theme, 'addField')}
                    value={this.state[fieldName]}
                    onChange={this.handleChange}
                    required={required}
                />
            </div>
        );
    }
    render() {
        const { onCancel } = this.props;
        const theme = this.props.theme.type;
        return (
            <div className={createClassName('addFormContainer', theme)}>
                <form className={createClassName('addForm', theme)}
                    onSubmit={this.handleSubmit}
                >
                    <div className='addPoster'>
                        <div className='imgFrames'></div>
                        <label htmlFor='addPoster'
                            className={createClassName(theme, 'label')}
                        >Poster URL:</label>
                        <input type='text'
                            id='addPoster'
                            name='imageUrl'
                            className={createClassName(theme, 'addField')}
                            value={this.state.imageUrl}
                        />
                        <div className='imgFrames'></div>
                    </div>
                    <div className='addDetails'>
                        {this.state.noBatman &&
                            <Bounce>
                                <h3 className={createClassName(theme)}> Batman Forever </h3>
                            </Bounce>
                        }
                        {this.renderInput('title', 'Title:', true)}
                        {this.state.noBatman &&
                            <span className='error'>This is not a <b>Batman</b> movie!</span>
                        }
                        {this.renderInput('year', 'Year:', true)}
                        {this.renderInput('type', 'Type:', true)}
                        {this.renderInput('genre', 'Genre')}
                        {this.renderInput('awards', 'Awards:')}
                        {this.renderInput('director', 'Director')}
                        {this.renderInput('actors', 'Actors:')}
                        {this.renderInput('language', 'Language:')}
                        {this.renderInput('rating', 'ImdbRating', true)}
                        {this.renderInput('plot', 'Plot')}
                    </div>
                    <div className='btnsWrapper'>
                        <button className={createClassName(theme, 'Btn')}
                            onClick={this.handlePreview}
                        > PREVIEW </button>
                        <button type='submit'
                            className={createClassName(theme, 'Btn')}
                        > ADD </button>
                        <button className={createClassName(theme, 'Btn')}
                            onClick={onCancel}
                        > CANCEL </button>
                    </div>
                </form>
                {this.state.preview &&
                    <div className={createClassName(theme, 'pvw')}>
                        <img src={this.state.imgUrl} alt='movie poster' />
                        <div className='pvwDetails'>
                            {this.renderPreview('title', 'Title: ')}
                            {this.renderPreview('year', 'Year: ')}
                            {this.renderPreview('type', 'Type: ')}
                            {this.renderPreview('genre', 'Genre: ')}
                            {this.renderPreview('awards', 'Awards: ')}
                            {this.renderPreview('director', 'Director: ')}
                            {this.renderPreview('actors', 'Actors: ')}
                            {this.renderPreview('language', 'Language: ')}
                            {this.renderPreview('rating', 'ImdbRating: ')}
                            {this.renderPreview('plot', 'Plot: ')}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default withTheme(AddNewMovie);



import React from 'react';
import axios from 'axios';
import './register.css' 

class RegisterForm extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            userName:'',
            password:'',
            passwordCheck:'',
            registerError: '',
        }
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit=(event)=>{
        const {userName, password, passwordCheck} = this.state;

        if(userName.length > 3 && password.length > 3 && password === passwordCheck){

            axios.post(
                'https://movies-app-siit.herokuapp.com/auth/register',
                {username: userName,
                password: password}
            ).then(response =>{
                console.log("success register response:", response)
                if(response.status === 200){
                    console.log(response, userName)
                    this.props.onSubmitRegister(response.data, userName)
                }
                
            }).catch(error=>{
                //console.log("register error msg:", error)
                this.setState({ registerError : 'This username already exists. Please choose another one!' })
            })

        }else if (userName.length < 3 || password.length < 3) {
            this.setState({ registerError : 'Username and password must be at least 4 characters each' })    
        
        }else if (password !== passwordCheck) {
            this.setState({registerError : 'Passwords don\'t match. Try again!'})
        }

        event.preventDefault();
    
    }
    render(){
        const {userName, password, passwordCheck} = this.state;
        
        return(
            <form className='reg-form'>
                <input type='text'
                       className='log-field'
                       name='userName'
                       placeholder='Username'
                       value = {userName}
                       onChange={this.handleChange}
                       required />
                <input type='password'
                       className='log-field'
                       name='password'
                       placeholder='Password'
                       value={password}
                       onChange={this.handleChange} 
                       required/>
                <input type='password'
                       className='log-field'
                       name='passwordCheck'
                       placeholder='Check Password'
                       value={passwordCheck}
                       onChange={this.handleChange} 
                       required/>
                <button type='submit'className='submitBtn'onClick={this.handleSubmit}>SUBMIT</button>
                <button className='cancelBtn' onClick={this.props.onCancel}>CANCEL</button>
                {
                    this.state.registerError !== '' && 
                        <div className='registerError'>
                            <p className='loginMsg'>{this.state.registerError}</p>
                        </div>
                }
            </form>
        )
    }
}
export  default RegisterForm
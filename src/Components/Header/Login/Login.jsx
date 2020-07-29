import React from 'react';
import axios from 'axios';
import './login.css' 

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            userName:'',
            password:'',
            loginError:false,
            forgotPass:false
        }
    }
    handleChange =(event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {userName, password} = this.state;
        axios.post(
            'https://movies-app-siit.herokuapp.com/auth/login',
            {username: userName,
            password: password}
        ).then(response =>{
            //console.log("success login response:", response)
            if(response.status === 200){
                this.props.onSubmitLogin(response.data, userName)
            }
              
        }).catch(error=>{
            //console.log("login error msg:",error)
            this.setState({ loginError : true })
        })
    }
    handleForgotPass = () => {
        this.setState({ forgotPass : true })
    }
    render(){
        const {userName, password} = this.state;

        return(
            <form className='log-form' onSubmit={this.handleSubmit}>
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
                <button type='submit'className='submitBtn'>SUBMIT</button>
                <button className='cancelBtn' onClick={this.props.onCancel}>CANCEL</button>
                {
                    this.state.loginError && 
                        <div className='loginError'>
                            <p className='loginMsg'>Invalid username or password. Try again!</p>
                            <button className='forgotPass'
                                    onClick={this.handleForgotPass}>Forgot password?</button>
                        </div>
                }
                {
                    this.state.forgotPass &&
                        <p className='forgotErr'>
                            The only way back is to <br />
                            <button className='reReg'
                                    onClick={this.props.reReg}>Register</button>
                            again.
                        </p>
                }
            </form>
        )
    }
}
export default LoginForm;


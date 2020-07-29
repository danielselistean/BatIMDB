import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import AddNewMovie from '../../Components/AddNewMovie/AddNewMovie';
import './AddPage.css';


class AddPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            addForm:true,
            successMsg: false
        }
    }
    //submits new movie, renders success mesage for user
    handleSubmitAdd = () =>{
        this.setState({addForm : false,
                       successMsg:true,
        })
    }
    //re-opens addForm to repeat add
    handleMoreAdd =() =>{
        this.setState({addForm : true,
                      successMsg : false})
    }
    onCancel= ()=> {
        this.props.history.goBack();
    }
    render(){
        
        const containerClass = this.props.theme.type ==='dark' ? 'addContainer dark' : 'addContainer light';
        return(
            <div className={containerClass}>
                {this.state.addForm && 
                    <AddNewMovie 
                        auth = {this.props.auth}
                        token = {this.props.token}
                        theme={this.props.theme}
                        onSubmitAdd = {this.handleSubmitAdd}
                        onCancel={this.onCancel}
                    />
                }
                
                {this.state.successMsg && 
                    <div className='successMsg'>
                        <h2>Movie added to the review queue. If everything is Batman True, it will be added to the database. </h2>
                        <button className='addMoreBtn'
                                onClick={this.handleMoreAdd}>ADD MORE</button>
                    </div>
                }
            </div>
            
        )
    }
}
export default withTheme(withRouter(AddPage))



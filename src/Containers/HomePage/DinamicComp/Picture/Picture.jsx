import React, { Component } from 'react';
import RotateList from 'react-rotate-list';
import '../Picture/Picture.css';

class Picture extends Component {
    
    render() { 
        const { picsAndIdsArray } = this.props;
        let pics = picsAndIdsArray.map((element, i) => {
            return (
                <a
                    onClick={()=> this.props.functionModal(element.id)}
                    key={i}                     
                >
                    <img src={element.pic}/>
                </a>
            )
        });
        return (
            <div className="Picture" >
                <RotateList
                    height={600}
                    duration={900}
                    delay={5000} >
                    {pics}
                </RotateList>                
            </div>
        )
    }
}

export default Picture;
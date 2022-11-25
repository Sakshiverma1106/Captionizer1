import React, {Component} from 'react'
import "./FetchError.scss";
import errorimg from "./errorimg.png"

class FetchError extends React.Component{
    constructor(props){
        super(props);
        // console.log(props);
    }
    render(){
        return (
            <div className='error-div'>
                <img src={errorimg}/>
                <p>We are not able to get your quotes at the moment!</p>
                <p>Try again after some time.</p>
                <button onClick={this.props.retry}>Retry</button>
            </div>
        );
    }
}
export default FetchError
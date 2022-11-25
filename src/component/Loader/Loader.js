import "./Loader.scss"
import React, {Component} from "react"
import chill from "./chill.png"

class Loader extends React.Component{
    render(){
        return (
            <div className = 'loader-div'>
                <span className="loader"></span>
                <p>Please Wait...</p>
                <h4>Hang On! while we are getting some beautiful quotes...</h4>
                <img src = {chill} />
            </div>
        )
    }
}
export default Loader
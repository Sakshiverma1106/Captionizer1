import React, {Component} from "react"
import ImageUploader from "../ImageUploader/ImageUploader";
import FetchError from "../FetchError/FetchError";
import QuoteDisplay from "../QuoteDisplay/QuoteDisplay";
import "./ImageCaptionizer.scss"
import Loader from "../Loader/Loader";
import hiImage from './sunglasses.png'

class ImageCaptionizer extends React.Component{
    constructor(){
        super();
        this.onUpload = this.onUpload.bind(this);
        this.retry = this.retry.bind(this);
        this.nullifyQuotes = this.nullifyQuotes.bind(this);
        this.state = {
            quotes: null,
            error : false,
            loading:false,
        }
    }

    onUpload(file){
        this.setState({quotes:null})
        let image = file;
        let reader = new FileReader();
        reader.onload = ()=>{
            this.setState({loading:true})
            let bstring = reader.result.replace("data:","").replace(/^.+,/,"");
            // console.log(bstring.length);
            fetch('http://localhost:5000',{
                method:'POST', 
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({image:bstring}),
            }).then(res=>res.json()).then(data=>{this.setState({
                quotes: data,
            })}).catch(error => {
                this.setState({
                    error:true,
                })
            }).finally(()=>{
                this.setState({loading:false})
            });
        }
        reader.readAsDataURL(image);
    }
    nullifyQuotes(){
        this.setState({
            quotes : null, 
        })
    }
    retry(){
        this.setState({
            error: false,
        })
    }
    render(){
        // console.log(this.state.quotes)
        return (
            <div className="image-captionizer">
                <p>Drop your Image here and allow us to suggest you some beautiful quotes.</p>
                <div className = 'image-upload-div'>
                    <img src = {hiImage} />    
                    <ImageUploader onUpload = {this.onUpload} nullifyQuotes = {this.nullifyQuotes}></ImageUploader>
                </div>

                {(this.state.error)?(
                    <FetchError retry = {this.retry}></FetchError>
                ):null}
                {(this.state.quotes)?(<QuoteDisplay quotes = {this.state.quotes} forimage = {true}></QuoteDisplay>):null}
                {(this.state.loading)?<Loader></Loader>:null}
            </div>
        )
    }


}
export default ImageCaptionizer
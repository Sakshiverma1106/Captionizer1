import React , {Component} from 'react';
import './KeywordCaptionizer.scss'
import QuoteDisplay from '../QuoteDisplay/QuoteDisplay';
import Loader from '../Loader/Loader';
import FetchError from '../FetchError/FetchError';

class KeywordCaptionizer extends React.Component{
    lastKeyPress
    constructor(props){
        super(props);
        this.state = {
            keywords:[],
            warning:null,
            quotes : null,
            error:false, 
            loading:false,
        }
        this.addKeyword = this.addKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
        this.validateKeyword = this.validateKeyword.bind(this);
        this.closeWarning = this.closeWarning.bind(this);
        this.getQuotes = this.getQuotes.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.retry = this.retry.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
        this.lastKeyPress = -1;
    }
    addKeyword(keyword){
        this.closeWarning();
        if(this.validateKeyword(keyword)){
            this.setState({
                keywords:[...this.state.keywords, keyword]
            }, ()=>{
                document.querySelector('.kw-div:last-child').classList.add('scale-in')
                setTimeout(()=>{
                    document.querySelector('.kw-div:last-child').classList.remove('scale-in')
                }, 200);
            })
            document.getElementById('kw-input').value = ''
            
        }
        
    }
    removeKeyword(index){
        document.querySelector(`.kw-div:nth-child(${index+1})`).classList.add('scale-out');
        this.setState({
            keywords:this.state.keywords.filter((keyword,i)=>{
                return index !== i
            })
        })
    }
    closeWarning(){
        this.setState({
            warning: null,
        })
    }
    validateKeyword(keyword){
        let warning = null;
        keyword = keyword.trim();
        if(this.state.keywords.length === 20){
            warning = 'You cannot add more than 20 keywords at a time.'
        }else if(keyword === ''){
            warning = 'You might have forgot to add some text.'
        }else if(!keyword.match(/^[a-zA-Z0-9]*$/)){
            warning = 'You can only add alphanumeric keywords please.'
        }else if(this.state.keywords.find((val)=>val === keyword) !== undefined){
            warning = 'Repeating keywords doesn\'t make sense.'
        }
        if(warning === null)return true;
        
        this.setState({
            warning: <div className = 'warning'>
                <p><span>&#9888;</span>{warning}</p>
                <button onClick = {this.closeWarning}>&#215;</button>
            </div>,
        }, ()=>{
            document.querySelector('.warning').classList.add('vibrate')
            setTimeout(() => {
                document.querySelector('.warning').classList.remove('vibrate')
            }, 800);
        })
        
        return false;
    }
    clearAll(){
        this.setState({
            keywords: [], 
            warning:null
        })
    }
    retry(){
        this.setState({error:false})
    }
    getQuotes(){
        this.setState({loading:true})
        fetch('http://localhost:5000/bykw',{
            method:'POST', 
            body: JSON.stringify({keywords:this.state.keywords}),
        }).then(res=>res.json()).then(data=> this.setState({
            quotes:data
        })).catch(error => {
            this.setState({
                error:true,
            })
        }).finally(()=>{
            this.setState({loading:false})
        })
    }
    handleKeydown(){
        let cond = this.lastKeyPress === -1;
        if(cond){
            // console.log("keydown")
            document.getElementById('input-div').classList.add('typing');
        }
        this.lastKeyPress = Date.now();
    }

    handleKeyup(){
        // console.log("keyup")

        setTimeout(() => {
            let current = Date.now();
            let cond = (current - this.lastKeyPress) >= 400
            if(cond){
                document.getElementById('input-div').classList.remove('typing');
                this.lastKeyPress = -1;
            }
        }, 400);
    }
    render(){
        let disabled = (this.state.keywords.length === 0);
        return (
            <div className = 'kc-div'>
                <p>Get quotes based on your choices of words.</p>
                <div className = 'kw-div'>
                    {(this.state.warning !== null)?this.state.warning:null}
                    <div className = 'kw-input-div'>
                        <div className = 'input-div' id='input-div'><input id='kw-input' type='text' placeholder='Enter your keywords here' autoComplete='off' onKeyDown={(event)=>{
                            if(event.key === 'Enter')this.addKeyword(document.getElementById('kw-input').value)
                            this.handleKeydown()
                        }} onKeyUp = {this.handleKeyup}/></div>
                        <button onClick = {()=>{this.addKeyword(document.getElementById('kw-input').value)}}>+</button>
                    </div>
                    <div className = 'kw-entered-div'>
                        {this.state.keywords.map((keyword, index)=>{
                            return (<div className = 'kw-div'>
                                <p>{keyword}</p>
                                <button onClick = {()=>{this.removeKeyword(index)}}>&#215;</button>
                            </div>)
                        })}
                    </div>
                </div>
                <div className = 'upload-div'>
                    <button onClick={this.clearAll} disabled = {disabled}>Clear All</button>
                    <button onClick = {this.getQuotes} disabled = {disabled}>Get Quotes</button>
                </div>
                {(this.state.error)?(
                    <FetchError retry = {this.retry}></FetchError>
                ):null}
                {(this.state.quotes)?(<QuoteDisplay quotes = {this.state.quotes} forimage = {false}></QuoteDisplay>):null}
                {(this.state.loading)?<Loader></Loader>:null} 
            </div>
        )
    }
}

export default KeywordCaptionizer
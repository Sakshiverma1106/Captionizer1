import React, { Component } from 'react'
import "./QuoteDisplay.scss";
import noquote from "./noquote.png"
import { NavLink } from 'react-router-dom';
import cheersImg from './cheers.png'

class QuoteDisplay extends React.Component {
    colors = ["bde0fe", "e9edc9", "ffc8dd", "e6ccb2", "e4c1f9", "d8f3dc", "edc4b3"]
    constructor(props) {
        super(props);
        this.copyQuote = this.copyQuote.bind(this);
        // console.log(props.quotes);
    }
    copyQuote(i) {
        let ele = document.querySelector(`#quote-${i} .copy-div`);
        let quote = document.querySelector(`#quote-${i} q`).innerText;
        // console.log(quote)
        navigator.clipboard.writeText(quote).then(() => {
            ele.classList.add('copy');
        })
        setTimeout(() => {
            ele.classList.remove('copy');
        }, 1000);

    }
    render() {
        let quotes = [];
        for (let i = 0; i < this.props.quotes.authors.length; i++) {
            // console.log(this.props.quotes.quotes[toString(i)])
            // console.log(toString(i))
            quotes.push(
                <li id={`quote-${i}`} key={i} onClick={() => { this.copyQuote(i); }} style={{ backgroundColor: `#${this.colors[i % this.colors.length]}` }}>
                    <div className='glow'></div>
                    <div className='copy-div'></div>
                    <p className='quote'>
                        <q>{this.props.quotes.captions[i.toString()]}</q>
                    </p>
                    <p className='author'>
                        - {this.props.quotes.authors[i.toString()]}
                    </p>
                </li>
            )
        }
        let noquotestatement = (this.props.forimage) ? (
            <>
                <h5>We are unable to find any quotes for your image.</h5>
                <p>You can either try different image or can <NavLink className='keyword-link' to="/keyword">search with keywords</NavLink></p>
            </>
        ) : (<p>We cannot find any appropiate quotes for your input.</p>)
        let noquotediv = (quotes.length == 0) ? (
            <div className='noquote-div'>
                <img src={noquote} />
                {noquotestatement}
            </div>
        ) : (
            <div className='quote-found-div'>
                <img src={cheersImg} />
                <h5>Here are the appropiate quotes we found your image.</h5>
                <p>Click on any quote to copy it.</p>
            </div>
        );
        return (
            <div className='quotes-display'>
                {noquotediv}
                <ul>
                    {quotes}
                </ul>
            </div>
        );
    }
}
export default QuoteDisplay
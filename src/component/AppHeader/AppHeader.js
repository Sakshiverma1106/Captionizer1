import React, {Component} from 'react';
import './AppHeader.scss'
import {NavLink} from 'react-router-dom'
import keywordLogo from './search.png'
import imageLogo from './image.png'

class AppHeader extends React.Component{
    
    render(){
        return (
            <div className = 'app-header'>
                <div className='sub-header'>
                    {/* <img src = {logo} /> */}
                    <h1>Captionizer</h1>
                    <h4>SUGGESTING BEAUTIFUL QUOTES BY AI</h4>
                </div>
                <div className = 'navigations-div'>
                <NavLink to='/' ><img className = 'image-logo' src = {imageLogo}/></NavLink>
                <NavLink to='/keyword' ><img src = {keywordLogo}/></NavLink>
                </div>
            </div>
        )
    }
}
export default AppHeader;
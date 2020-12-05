import React, {Component} from 'react';
import '../style.css';

import Loginform from './Loginform';
import Movies from './Movies';
import {Redirect, Route} from 'react-router-dom';



class App extends Component {


    render(){

        return (
        <div className="container">

           
            <Route exact path="/movies" render={()=>{
                console.log('qua')
                let content = null;
                localStorage.getItem('token') ?
                content = <Movies />
                :
                content = <Redirect to="/" />
                return content;
            }}></Route> 
            
            
            <Route exact path="/" render={()=>{
                let content = null;
                !localStorage.getItem('token') ?
                content = <Loginform/>
                : 
                content = <Redirect to="movies" />
                return content;
            }
            }></Route>
            

        </div>)
    }

}

export default App;

import React, {Component} from 'react';
import '../style.css';

import Loginform from './Loginform';
import Movies from './Movies';
import {Redirect, Route} from 'react-router-dom';
import MovieManipulator from './MovieManipulator';
import MovieEdit from './MovieEdit';



class App extends Component {


    render(){

        return (
        <div className="container">

           
            <Route exact path="/movies" render={()=>{
                let content = null;
                localStorage.getItem('token') ?
                content = <Movies />
                :
                content = <Redirect to="/" />
                return content;
            }}></Route>

            <Route exact path="/movie-add" render={()=>{
                let content = null;
                localStorage.getItem('token') ?
                content = <MovieManipulator />
                :
                content = <Redirect to="/" />
                return content;
            }}></Route>

            <Route exact path="/movie-edit" render={(props)=>{
                let content = null;
                console.log(props.location);
                localStorage.getItem('token') ?
                content = <MovieEdit  {...props} />
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

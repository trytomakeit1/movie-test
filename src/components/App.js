import React, {Component} from 'react';
import '../style.css';

import Loginform from './Loginform';
import Movies from './Movies';
import {Redirect, Route, NavLink} from 'react-router-dom';
import MovieInsertion from './MovieInsertion';
import MovieEdit from './MovieEdit';
import MovieTile from './MovieTile';

class App extends Component {

    constructor(){
        super()
        this.logoStyle = {
            marginLeft: "15px",
            fontFamily: "cursive",
            textTransform: "uppercase",
            borderBottom: "1px white",
            borderBottomStyle: "dashed",
            borderTop: "1px white",
            borderTopStyle: "dashed"
        }
    }

    render(){

        return (
        <div className="container">
            <header className="header">
                <div>
                    <span style={this.logoStyle}>Movie App</span>
                </div>
                <div>
                    <NavLink style={{marginRight: "15px"}} to="/movies">Home</NavLink>
                </div>
            </header>
            <div className="main-content">

           
                <Route exact path="/movies" render={()=>{
                    let content = null;
                    localStorage.getItem('token') ?
                    content = <Movies />
                    :
                    content = <Redirect to="/" />
                    return content;
                }}></Route>

                <Route exact path="/movie-add" render={(props)=>{
                    let content = null;
                    localStorage.getItem('token') ?
                    content = <MovieInsertion {...props}/>
                    :
                    content = <Redirect to="/" />
                    return content;
                }}></Route>

                <Route exact path="/movie-edit" render={(props)=>{
                    let content = null;
                    localStorage.getItem('token') ?
                    content = <MovieEdit  {...props} />
                    :
                    content = <Redirect to="/" />
                    return content;
                }}></Route>


                <Route exact path="/movie-details" render={(props)=>{
                    let content = null;
                    localStorage.getItem('token') ?
                    content = <MovieTile  {...props} />
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
            

            </div>
        </div>)
    }

}

export default App;

import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom';

import { gql, useMutation, useQuery } from '@apollo/client';

const MovieTile = (props) => {


    const [listShowState, updateListShow] = useState({
        list: true
    });
    const [userState, updateUser] = useState({
        user: {}
    })

    const movie = {...props.location.state.movie};

    const DELETE_MOVIE = gql`
    mutation deleteMovieMutation($id: ID!) {
        deleteMovie(id: $id ) {
        result
        }
    }
    `;

    const [deleteMovie, {deleteError}] = useMutation(DELETE_MOVIE);


    const UPDATE_MOVIE = gql`
    mutation editMovieMutation($id: ID!, $name: String!, $releaseDate: String!, $duration: Int!, $actors: [String]!, $averageRating: Int, $usersRated: [String]) {
        updateMovie(id: $id, name: $name, releaseDate: $releaseDate, duration: $duration, actors: $actors, averageRating: $averageRating, usersRated: $usersRated) {
        id name
        }
    }
    `;

    const [updateMovie, {updateMovieErrof}] = useMutation(UPDATE_MOVIE);


    const CURRENT_USER = gql`
        query currentUserQuery {
            currentUser {
                id
            }
        }
    `;

    const {loading, error, data, refetch } = useQuery(CURRENT_USER);


    let actorsList = movie.actors.map((actor, index) => {
            return <span key={actor}>{actor}{index < movie.actors.length - 1 ? "," : null}</span> 
    });



    const listShowChange = () => {
        updateListShow({
            list: false
        })
    }


    const feedbackHandler = (e) => {
        e.preventDefault();
      /*   if(!userState.user.id) {
            loadUserInfo({variables: {}});
        } */
        
        if(loading) {
            content = <h3>loading</h3>
        } else if(data) {
            console.log( data );
        }
        
        const newRate = e.target.rate.value;
        //const comment = e.target.comment.value;
        //calculate rate:
        const usersRatedLength = movie.usersRated.length === 0 ? 1 : movie.usersRated.length;
        let averageRate = movie.averageRating;

        if(movie.averageRating !== 0)
        averageRate = newRate ? Math.floor((parseInt(newRate) + movie.averageRating) / 2) : movie.averageRating;
        else 
        averageRate = parseInt(newRate);

        // TODO add comment
        let user = data.currentUser.id;
        const movieRates = [...movie.usersRated];
        movieRates.push(user);
        
        updateMovie({variables: {id:movie.id,
            name: movie.name, releaseDate: movie.releaseDate, duration: movie.duration, actors: movie.actors,
            averageRating: averageRate, usersRated: movieRates }});
    }


    let content = null;
    if(listShowState.list) {
        content = (
        <div>
        
            <div className="movieTile">
            <h4>{movie.name}</h4>
            <p>Release date: {movie.releaseDate}</p>
            <p>Duration: {movie.duration} minutes</p>
            <p>Actors: {actorsList}</p>
            <p>Average user rating: {movie.averageRating === 0 ? "No ratings" : movie.averageRating}</p>
            <button className="button" style={{margin: "10px"}} onClick={listShowChange}>Edit</button>

            <button className="button" style={{background: "#ff4747", margin: "10px"}} 
                onClick={(e)=>{e.preventDefault();
                    deleteMovie({variables: {id: movie.id}});
                    props.history.replace("movies"); }}>Delete</button>
        </div>
        
        
            <div className="feedback">
            {/*rate*/}
            <form onSubmit={feedbackHandler}>
            <div>
                <div className="radioholder">
                    <label htmlFor="radio1">1</label>
                    <input id="radio1" type="radio" name="rate" defaultChecked={movie.averageRating === 1 ? true: false}
                    value="1"></input>
                </div>
                <div className="radioholder">
                    <label htmlFor="radio2">2</label>
                    <input id="radio2" type="radio" name="rate" defaultChecked={movie.averageRating === 2 ? true: false}
                    value="2"></input>
                </div>
                <div className="radioholder">
                   
                    <label htmlFor="radio3">3</label>
                    <input id="radio3" type="radio" name="rate" defaultChecked={movie.averageRating === 3 ? true: false}
                    value="3"></input>
                </div>
                <div className="radioholder">
                    <label htmlFor="radio4">4</label>
                    <input id="radio4" type="radio" name="rate" defaultChecked={movie.averageRating === 4 ? true: false}
                    value="4"></input>
                </div>
                <div className="radioholder">
                    <label htmlFor="radio5">5</label>
                    <input id="radio5" type="radio" name="rate" defaultChecked={movie.averageRating === 5 ? true: false}
                    value="5"></input>
                </div>
            </div>
           {/*  <div style={{display: "table", margin: "0 auto"}}>

                <label>Write your comment here:</label>
                <textarea draggable="false" name="comment"></textarea>
            </div> */}
            <div>
{/*             style={{margin: "10px"}}
 */}                <button className="button">Add feedback</button>
            </div>
            {/*comment*/}
            </form>
        </div>
    </div>);
    } else {
        content = <Redirect to={{
            pathname: "movie-edit",
            state: {movie: movie}
            }
        }/>
    }
    return content
}
export default MovieTile;
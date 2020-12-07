import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';

const MovieTile = (props) => {

    const [listShowState, updateListShow] = useState({
        list: true
    })
    let movie = props.movie;

    const DELETE_MOVIE = gql`
    mutation deleteMovieMutation($id: ID!) {
        deleteMovie(id: $id ) {
        result
        }
    }
    `;

    const [deleteMovie, {deleteError}] = useMutation(DELETE_MOVIE);


    let actorsList = movie.actors.map((actor, index) => {
            return <span key={actor}>{actor}{index < movie.actors.length - 1 ? "," : null}</span> 
    });



    const listShowChange = () => {
        updateListShow({
            list: false
        })
    }


    let content = null;
    if(listShowState.list) {
        content = (<div className="movieTile">
            <h4>{movie.name}</h4>
            <p>Release date: {movie.releaseDate}</p>
            <p>Duration: {movie.duration} minutes</p>
            <p>Actors: {actorsList}</p>
            <p>Average user rating: {movie.averageRating === 0 ? "No ratings" : movie.averageRating}</p>
            <button className="button" style={{margin: "10px"}} onClick={listShowChange}>Edit</button>
            <button className="button" style={{background: "red", margin: "10px"}} 
                onClick={(e)=>{e.preventDefault();console.log(" here" );deleteMovie({variables: {id: movie.id}}); props.refetching() }}>Delete</button>
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
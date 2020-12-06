import React from 'react'


const MovieTile = (props) => {

    let movie = props.movie;

    let actorsList = movie.actors.map((actor, index) => {
            return <span key={actor}>{actor}{index < movie.actors.length - 1 ? "," : null}</span> 
    });

    return (<div className="movieTile">
        <h4>{movie.name}</h4>
        <p>Release date: {movie.releaseDate}</p>
        <p>Duration: {movie.duration} minutes</p>
        <p>Actors: {actorsList}</p>
        <p>Average user rating: {movie.averageRating === 0 ? "No ratings" : movie.averageRating}</p>
    </div>)
}
export default MovieTile;
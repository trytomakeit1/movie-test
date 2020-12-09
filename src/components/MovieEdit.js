import React, { useState, Fragment, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';


const MovieEdit = (props) => {

    //TODO if props.movie is not passed, show a warning
    const movie = props.location.state.movie;
    const history = useHistory();
    const actorsRef = useRef(null);



    const [actorsState, updateActors] = useState({
        actorsList : movie.actors
    });

    const UPDATE_MOVIE = gql`
    mutation editMovieMutation($id: ID!, $name: String!, $releaseDate: String!, $duration: Int!, $actors: [String]!) {
        updateMovie(id: $id, name: $name, releaseDate: $releaseDate, duration: $duration, actors: $actors ) {
        id name
        }
    }
    `;


    const [updateMovie, {updateMovieErrof}] = useMutation(UPDATE_MOVIE);



    const addActorsHandler = (e) =>{
        e.preventDefault();
        let actorsListCopy = actorsState.actorsList.slice();
        const actorValue = actorsRef.current.value;

        if (actorValue.trim().length > 0) {
            let actorExists = false;

            for(let i = 0; i < actorsListCopy.length; i++){
                if(actorsListCopy[i].toLowerCase() === actorValue.toLowerCase())
                    actorExists = true;

            }
            if( !actorExists) {
                actorsListCopy.push(actorValue);
                actorsRef.current.value = "";
                updateActors({
                    actorsList: actorsListCopy
                });
            }
        }
    }


    const clearActorsList = (e) => {
        e.preventDefault();
        updateActors({
            actorsList : []
        });
    }



    const actorsListDisplay = actorsState.actorsList.map((actor, ind) => {
        return <li key={actor}><label>{actor}</label></li>
    });



    return (
    <div className="movieForm">

        <form onSubmit={(e)=>{
                e.preventDefault();
                let name = e.target.elements.name.value;
                let releaseDate = e.target.elements.releaseDate.value;
                let duration = parseInt(e.target.elements.duration.value);
                let actors = actorsState.actorsList;

                updateMovie({variables: {id:movie.id, name, releaseDate, duration, actors}});
                //redirect to movies    
                history.replace("movies");
            }}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" placeholder="name" 
                defaultValue={movie.name}
                ></input>
            </div>

            <div>
                <label>Release Date: (mm/dd/yyyy)</label>
                <input type="text" name="releaseDate" placeholder="releaseDate"
                defaultValue={movie.releaseDate}
                ></input>
            </div>
           <div>
                <label>Duration: (in minutes)</label>
                <input type="text" name="duration" placeholder="duration"
                defaultValue={movie.duration}></input>
            </div>
        
 
            <div>
                <label htmlFor="actors">Actors: </label>
                <input id="actors" type="text" name="actors" placeholder="actors"
                ref={actorsRef}></input>
                <button className="button" style={{marginLeft: "3px", padding: "6px", fontSize: "0.65rem"}} onClick={addActorsHandler}>Add actor</button>
            </div>

            {actorsState.actorsList.length > 0 ?
            <Fragment>
                <div>
                    <ul style={{paddingLeft: "12px", margin: "0"}}>
                        {actorsListDisplay}
                    </ul>
                </div>
                <div>
                    <button className="button" style={{marginTop: "3px", padding: "4px", fontSize: "0.65rem"}} onClick={clearActorsList}>Clear actors list</button>
                </div>
            </Fragment>
            :null}
            
            <div style={{marginTop: "20px"}}>
                <button className="button">Edit</button>
            </div>
        </form>
    </div>
    )
}

export default MovieEdit;


import React, { Fragment, useRef, useState } from 'react';
import { useMutation, gql } from '@apollo/client';


const MovieInsertion = (props) => {


    const actorsRef = useRef(null);

    const [actorsState, updateActors] = useState({
        actorsList : []
    });


    const ADD_MOVIE = gql`
        mutation addMovieMutation($name: String!, $releaseDate: String!, $duration: Int!, $actors: [String]!) {
            insertMovie(name: $name, releaseDate: $releaseDate, duration: $duration, actors: $actors ) {
                id name
            }
        }
    `;

    const [addNewMovie, { addMovieData }] = useMutation(ADD_MOVIE);

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
        // can potentially give notification that actor has already been inserted.
    }


    const clearActorsList = (e) => {
        e.preventDefault();
        updateActors({
            actorsList : []
        });
    }



    //TODO form validation

    const actorsListDisplay = actorsState.actorsList.map((actor, ind) => {
        return <li key={actor}><label>{actor}</label></li>
    });
    return (
    <div>
        <p>Use the form below to add a new movie</p>

        <div className="movieForm">

            <form onSubmit={(e)=>{
                    e.preventDefault();
                    let name = e.target.elements.name.value;
                    let releaseDate = e.target.elements.releaseDate.value;
                    let duration = parseInt(e.target.elements.duration.value);
                    let actors = actorsState.actorsList;
                    addNewMovie({variables:{name, releaseDate, duration, actors}});
                    props.history.replace("movies");
                }}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" placeholder="name"></input>
                </div>

                <div>
                    <label>Release Date: (mm/dd/yyyy)</label>
                    <input type="text" name="releaseDate" placeholder="releaseDate"></input>
                </div>
                <div>
                    <label>Duration: (in minutes)</label>
                    <input type="text" name="duration" placeholder="duration"></input>
                </div>
            

                <div>
                    <label htmlFor="actors">Actors: </label>
                    <input id="actors" type="text" name="actors" placeholder="actors"
                    ref={actorsRef}></input>
                    <button className="button" style={{marginLeft: "3px", padding: "4px", fontSize: "0.65rem"}} onClick={(e)=>addActorsHandler(e)}>Add actor</button>
                </div>

                {actorsState.actorsList.length > 0 ?
                <Fragment>
                    <div>
                        <ul style={{paddingLeft: "12px", margin: "0"}}>
                            {actorsListDisplay}
                        </ul>
                    </div>
                    <div>
                        <button className="button" style={{marginTop: "3px", padding: "6px", fontSize: "0.65rem"}} onClick={clearActorsList}>Clear actors list</button>
                    </div>
                </Fragment>
                :null}

                <div style={{marginTop: "20px"}}>
                    <button className="button">Add</button>
                </div>
            </form>
        </div>
    </div>
   )
}
export default MovieInsertion;
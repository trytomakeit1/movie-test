import React, {Fragment, useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import MovieTile from './MovieTile';
import {useHistory} from 'react-router-dom';


const Movies = (props) => {


    //TODO on mounted, list new movies
    const history = useHistory();

    const MOVIES_LIST = gql`
    query moviesListQuery {
        moviesList {
            id name releaseDate duration actors averageRating
        }
    }
    `;


    useEffect(() => {

        if(data) {
            console.log(" got data again");
        }
    }, [data]);


    const {loading, error, data, refetch } = useQuery(MOVIES_LIST);

    console.log(loading);
    console.log(data);
    let content = null;
    if(loading) {
        content = <h3>loading</h3>
    } else if(data) {
        refetch();
        content = data.moviesList.map((movie, index)=><MovieTile key={movie.id} movie={movie} refetching={()=>refetch()}/>);
    }


    const addMovieHandler = (e) => {
        e.preventDefault();
        //redirect
        let p =  "/movie-add"
        history.push(p);
    }

    return (
        <Fragment>
            <div>Movies</div>
            <button style={{margin: "20px"}} className="button" onClick={addMovieHandler}>Add new movie</button>
            <div className="moviesList">
                {content}
            </div>
        </Fragment>
    )
}

export  default Movies ;
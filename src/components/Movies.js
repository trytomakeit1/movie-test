import React, {Fragment} from 'react';
import { useQuery, gql } from '@apollo/client';
import MovieTile from './MovieTile';
import {useHistory} from 'react-router-dom';
import TableView from './TableView'

const Movies = (props) => {


    //TODO on mounted, list new movies
    const history = useHistory();

    const MOVIES_LIST = gql`
    query moviesListQuery {
        moviesList {
            id name releaseDate duration actors averageRating usersRated
        }
    }
    `;


    const {loading, error, data, refetch } = useQuery(MOVIES_LIST);

    let content = null;
    if(loading) {
        content = <h3>loading</h3>
    } else if(data) {

        //TODO ** fix refetch
        //refetch();
        content = <TableView data={data} />
        //content = data.moviesList.map((movie, index)=><MovieTile key={movie.id} movie={movie} refetching={()=>refetch()}/>);
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
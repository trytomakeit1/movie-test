import { useQuery, gql } from '@apollo/client';

const queries = () => {


    const MOVIES_LIST = gql`
    query moviesListQuery {
        moviesList {
            id name releaseDate duration actors averageRating usersRated
        }
    }
    `;

    const {loading, error, data, refetch } = useQuery(MOVIES_LIST, {fetchPolicy: 'network-only'});

    return({
        moviesList: () => {
            return {loading, data, refetch}
        }
    })
}


export default queries;

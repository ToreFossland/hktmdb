import { gql, useQuery } from '@apollo/client';
import React from 'react';
import '../index.css';



const SearchHistory = () => {
    
    
    const GET_SEARCHHISTORY = gql`
    {
        SearchHistory(first:5) {
            query
            date
        }
    }
`;

    const { loading, error, data } = useQuery(GET_SEARCHHISTORY)
    if (error) return <p>Error</p>
    if (loading) return <p>Fetching movies...</p>

    const movies = data.SearchHistory.map((query: any) => query)
    
    const moviedivs = []
    for(var i=0; i < movies.length; i++) {
        moviedivs[i] = <p>{movies[i].query}</p>
    }

    return (
        <div>
            <h1>What people have searches for</h1>
            <div className="moviediv">{moviedivs}</div>
        </div>
    );
}


export default SearchHistory;
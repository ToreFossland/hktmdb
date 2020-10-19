import { gql, useQuery } from '@apollo/client';
import React from 'react';
import '../index.css';



const SearchResults = ({...props}) => {

    var input = function capitalizeFirstLetters(input: string) {
        var splitStr = input.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    const GET_MOVIES = gql`
    {
        Movie(filter: {title_contains: "${input(props.input)}"}) {
            title
        }
    }
`;

    const { loading, error, data } = useQuery(GET_MOVIES)
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>

    const movies = data.Movie.map((movie: any) => movie)
    
    const moviedivs = []
    for(var i=0; i < movies.length; i++) {
        moviedivs[i] = <p>{movies[i].title}</p>
    }
    return (
        <div>
            <div className="moviediv">{moviedivs}</div>
        </div>
    );
}


export default SearchResults;
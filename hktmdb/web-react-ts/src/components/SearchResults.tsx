import { gql, useQuery } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import '../index.css';



const SearchResults = ({...props}) => {
    const [movieCount, setMovieCount] = useState(0);

    useEffect(() => {
        setMovieCount(0);
    }, [props.input])

    const capitalizeFirstLetters = (input: string) => {
        var splitStr = input.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    const GET_MOVIES = gql`
    {
        Movie(first:5 offset: ${movieCount}, filter: {title_contains: "${capitalizeFirstLetters(props.input)}"}) {
            title
        }
    }
`;

    const { loading, error, data } = useQuery(GET_MOVIES)
    if (error) return <p>Error</p>
    if (loading) return <p>Fetching movies...</p>

    const movies = data.Movie.map((movie: any) => movie)
    
    const moviedivs = []
    for(var i=0; i < movies.length; i++) {
        moviedivs[i] = <p>{movies[i].title}</p>
    }


    var moreResults = function() {
        if(moviedivs.length >= 5) {
            return <button onClick={() => setMovieCount(movieCount+5)}>Show more</button>
        }
    }


    return (
        <div>
            <div className="moviediv">{moviedivs}</div>
            {moreResults()}
        </div>
    );
}


export default SearchResults;

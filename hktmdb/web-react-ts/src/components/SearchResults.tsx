import { gql, useQuery } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import '../index.css';



const SearchResults = ({...props}) => {
    const [movieCount, setMovieCount] = useState(0);
    const [movieId, setMovieId] = useState("");

    useEffect(() => {
        setMovieCount(0);
    }, [props.input, props.firstYear, props.secondYear, props.filterType])

    var capitalizeFirstLetters = function(input: string) {
        var splitStr = input.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    const GET_MOVIES = gql`
    {
        Movie(first:5 offset: ${movieCount}, orderBy: ${props.filterType}_asc, filter: {title_contains: "${capitalizeFirstLetters(props.input)}", released_gte: ${props.firstYear}, released_lte: ${props.secondYear}}) {
            _id
            title
            released
        }
    }
`;

    const { loading, error, data } = useQuery(GET_MOVIES)
    if (error) return <p>Error</p>
    if (loading) return <p>Fetching movies...</p>

    const movies = data.Movie.map((movie: any) => movie)
    
    const moviedivs = []
    for(var i=0; i < movies.length; i++) {
        moviedivs[i] = <li value={i} onClick={(event) => showDetails(event)}>{movies[i].title}({movies[i].released}) </li>
    }

    function showDetails(event: any) {
        setMovieId(movies[event.target.value]._id)
        console.log(movieId);
    }

    var moreResults = function() {
        if(moviedivs.length >= 5) {
            return <button onClick={() => setMovieCount(movieCount+5)}>Show more</button>
        }
    }


    return (
        <div>
            <ul className="moviediv">{moviedivs}</ul>
            {moreResults()}
        </div>
    );
}


export default SearchResults;

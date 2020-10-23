import { gql, useQuery } from '@apollo/client';
import { useObserver } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { useDataStore } from "../context";
import '../index.css';


const SearchResults = () => {
    const [movieCount, setMovieCount] = useState(0);
    const store = useDataStore();
    let searchInput = useObserver(() => (store.filterProps.get("searchInput")))
    let firstYear = useObserver(() => (store.filterProps.get("firstYear")))
    let secondYear = useObserver(() => (store.filterProps.get("secondYear")))
    let filterType = useObserver(() => (store.filterProps.get("filterType")))


    useEffect(() => {
        setMovieCount(0);
    }, [searchInput, firstYear, secondYear, filterType])

    const capitalizeFirstLetters = (input: string) => {
        var splitStr = input.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }


    const GET_MOVIES = gql`
        {
            Movie(first:5 offset: ${movieCount}, orderBy: ${filterType}_asc, filter: {title_contains: "${capitalizeFirstLetters(searchInput!)}", released_gte: ${firstYear}, released_lte: ${secondYear}}) {
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
        moviedivs[i] = <li key={movies[i]._id} value={i} onClick={(event) => showDetails(event)}>{movies[i].title}({movies[i].released}) </li>
    }

    function showDetails(event: any) {
        store.addCurrentResultId(movies[event.target.value]._id)
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

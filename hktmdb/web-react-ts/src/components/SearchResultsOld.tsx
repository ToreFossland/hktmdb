import { gql, useQuery } from '@apollo/client';
import { useObserver } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { useDataStore } from "../context";
import '../index.css';


const SearchResults = () => {
    const [movieCount, setMovieCount] = useState(4);
    const [personCount, setPersonCount] = useState(2);
    const store = useDataStore();
    let searchInput = useObserver(() => (store.filterProps.get("searchInput")))
    let firstYear = useObserver(() => (store.filterProps.get("firstYear")))
    let secondYear = useObserver(() => (store.filterProps.get("secondYear")))
    let movieFilterType = useObserver(() => (store.filterProps.get("movieFilterType")))
    let personFilterType = useObserver(() => (store.filterProps.get("personFilterType")))


    useEffect(() => {
        setMovieCount(4)
    }, [searchInput, firstYear, secondYear, movieFilterType])

    useEffect(() => {
        setPersonCount(2)
    }, [searchInput, firstYear, secondYear, movieFilterType])

    const capitalizeFirstLetters = (input: string) => {
        var splitStr = input.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }


    const GET_MOVIES = gql`
        query movieQuery($offset1: Int!, $offset2: Int!){
            Movie(first:4, offset: $offset1, orderBy: ${movieFilterType}_asc, filter: {title_contains: "${capitalizeFirstLetters(searchInput!)}", released_gte: ${firstYear}, released_lte: ${secondYear}}) {
                _id
                title
                released
            }
            Person(first: 2, offset: $offset2, filter: {name_contains: "${capitalizeFirstLetters(searchInput!)}", born_gte: ${firstYear}, born_lte: ${secondYear}}) {
                _id
                name
                born
            }
        }
    `;

    const { loading, error, data, fetchMore } = useQuery(GET_MOVIES, {
        variables: {
            offset1: 0,
            offset2: 0
        },
        fetchPolicy: "cache-and-network"
    });
    if (error) return <p>Error</p>
    if (loading) return <p>Fetching movies...</p>


    let movies = data.Movie.map((movie: any) => movie);
    let persons = data.Person.map((person: any) => person);
    
    const moviedivs = [];
    for(var i=0; i < movies.length; i++) {
        moviedivs[i] = <li key={movies[i]._id} value={i} onClick={(event) => showMovieDetails(event)}>M:{movies[i].title}({movies[i].released}) </li>
    }
    const persondivs = [];
    for(var j=0; j < persons.length; j++) {
        persondivs[j] = <li key={persons[j]._id} value={j} onClick={(event) => showPersonDetails(event)}>P:{persons[j].name}({persons[j].born}) </li>
    }

    function showMovieDetails(event: any) {
        store.addCurrentResultId(movies[event.target.value]._id)
    }

    function showPersonDetails(event: any) {
        store.addCurrentResultId(persons[event.target.value]._id)
    }
    
    var moreResults = function(input: number) {
        if(input == movieCount+personCount) {

            return <button onClick={ () => {setMovieCount(movieCount+4); setPersonCount(personCount+2); fetchMore({
                variables: {
                offset1: moviedivs.length,
                offset2: persondivs.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    Movie: [...prev.Movie, ...fetchMoreResult.Movie],
                    Person: [...prev.Person, ...fetchMoreResult.Person]
                });
                }
            });}}>Show more</button>
            
        }
        console.log(personCount);
    }


    return (
        <div>
            <ul className="moviediv">{moviedivs} {persondivs}</ul>
            {moreResults(moviedivs.length+persondivs.length)}
        </div>
    );
}


export default SearchResults;

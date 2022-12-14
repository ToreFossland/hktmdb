import { gql, useQuery } from '@apollo/client';
import { useObserver } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { useDataStore } from "../context";
import '../styling/search.css';
import {getNewID} from "./newId"

interface Movie{
    title: string,
    released:  number,
    tagline: String,
    actors: string[],
    directors: string[],
    producers: string[],
    writers: string[],
}

interface Person{
    name: string,
    born:  number,
    acted: string[],
    directed: string[],
    produced: string[],
    wrote: string[]
}


const MovieDescription = () => {
    //Initializing state, this gql query never runs
    const [query, setQuery] = useState(gql`{
        Movie{
            title
        }
    }`);

//data for the hooks before actual data is ready to be shown
    const [movie, setMovie] = useState<Movie>()
    const [person, setPerson] = useState<Person>()

    const store = useDataStore();
    let whichData = useObserver(() => (store.filterProps.get("dataFilterType")))
    let currentResultID = useObserver(() => store.currentResultId);
    let currentPersonID = useObserver(() => store.currentPersonId);

    const GET_MOVIE_DETAILS = gql`
        query ($idMovie:ID!){
            Movie(_id: $idMovie){
                title
                released
                tagline
                persons{
                    name
                }
                directors{
                    name
                }
                producers{
                    name
                }
                writers{
                    name
                }
            }
        }
    `;

    const GET_PERSON_DETAILS = gql`
        query($idPerson:ID!){
            Person(_id: $idPerson){
                name
                born
                acted{
                    title
                }
                directed{
                    title
                }
                produced{
                    title
                }
                wrote{
                    title
                }
            }
        }
    `;
    


    //Kan ikke flytte all koden inn i if setningen fordi useQuery ikke kan v??re inne i en conditional
    useEffect(() => {
        if(whichData === "Movie"){
            setQuery(GET_MOVIE_DETAILS);
        }else{
            setQuery(GET_PERSON_DETAILS)
        }
    }, [GET_MOVIE_DETAILS, GET_PERSON_DETAILS, whichData])

    const { loading, error, data} = useQuery(query, {variables:{idMovie:currentResultID, idPerson:currentPersonID},fetchPolicy: "cache-and-network" })


    //Henter detaljer for movie
    useEffect(() => {
        if(whichData === "Movie" && data) {
            try{
                let currentMovie = data.Movie[0]
                const results: Movie = {
                    title: currentMovie.title,
                    released: currentMovie.released,
                    tagline: currentMovie.tagline,
                    actors: currentMovie.persons.map((person: any) => <li key={getNewID()}>- {person.name}</li>),
                    directors: currentMovie.directors.map((person: any) => <li key={getNewID()} >- {person.name}</li>),
                    producers: currentMovie.producers.map((person: any) => <li key={getNewID()}>- {person.name}</li>),
                    writers: currentMovie.writers.map((person: any) => <li key={getNewID()}>- {person.name}</li>),
                }
                setMovie(results)
                
            }catch(error){}
        }
    }, [data, whichData, currentResultID])

    //Henter detaljer for person
    useEffect(() => {
        if(whichData === "Person") {
            try{
                let currentPerson = data.Person[0]
                const results: Person = {
                    name: currentPerson.name,
                    born:  currentPerson.born,
                    acted: currentPerson.acted.map((movie:any) =><li key={getNewID()}> - {movie.title}</li>),
                    directed: currentPerson.directed,
                    produced: currentPerson.produced,
                    wrote: currentPerson.wrote
                }
                setPerson(results)
            }catch(error){}
        }
    }, [data, whichData, currentPersonID])

    if(whichData === "Movie" && currentResultID !== "177" && movie){
        return (
            <div>
                <div id="data_details">
                    <h1> {movie.title} ({movie.released}) </h1>
                    <h6> "{movie.tagline}"</h6>
                    <ul>Actors in this movie: {movie.actors} </ul>
                    <ul>Directors in this movie:{movie.directors} </ul>
                    <ul>Producers of this movie: {movie.producers} </ul>
                </div>
            </div>
        );
    }else if(whichData === "Person" && currentPersonID !== "172" && person) {
        return (
            <div>
                <div id="data_details">
                    <h1>{person.name}</h1>
                    <h6>Born: {person.born}</h6>
                    <ul>Acted in movies:{person.acted}</ul>
                </div>
            </div>
        )

    }
    if (error) return <div><h1>Results:</h1><p>Login to see comments</p></div>
    if (loading) return <div><h1>Results</h1><p>Fetching movies...</p></div>
    return <div><p>Details about a movie or person will be displayed here.</p></div>
    
}




export default MovieDescription;
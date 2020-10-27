import { gql, useQuery } from '@apollo/client';
import { useObserver } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { useDataStore } from "../context";
import '../index.css';


interface Movie{
    title: string,
    released:  number,
    tagline: String,
    actors: string[],
    directors: string[],
    producers: string[],
    writers: string[]
}

const MovieDescription = () => {

    const store = useDataStore();

    let currentResultID = useObserver(() => store.currentResultId);

    const GET_MOVIE_DETAILS = gql`
        {
          Movie(_id: ${currentResultID}){
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

    const { loading, error, data } = useQuery(GET_MOVIE_DETAILS)
    if (error) return <p>Error</p>
    if (loading) return <p>Fetching movies...</p>
    console.log(data.Movie[0].writers.map((person:any) => person.name))

    let currentMovie = data.Movie[0]

    const movie: Movie = {
        title: currentMovie.title,
        released: currentMovie.released,
        tagline: currentMovie.tagline,
        actors: currentMovie.persons.map((person:any) => person.name),
        directors: currentMovie.directors.map((person:any) => person.name),
        producers: currentMovie.producers.map((person:any) => person.name),
        writers: currentMovie.writers.map((person:any) => person.name)

    }

    return (
        <div>
           <h1> {movie.title} </h1>
            <ul> {movie.actors} </ul>
            <ul> {movie.directors} </ul>
            <ul> {movie.producers} </ul>
        </div>
    );

}


export default MovieDescription;
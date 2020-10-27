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
    writers: string[],
    reviews: MovieReview[]
}

interface Person{
    name: string,
    born:  number,
    acted: string[],
    directed: string[],
    produced: string[],
    wrote: string[]
}

interface MovieReview {
    header: String,
    review: String,
    score: number,
    userId: String
  }

const MovieDescription = () => {
    //Initializing state, this gql query never runs
    const [query, setQuery] = useState(gql`{
        Movie{
            title
        }
    }`);

    const dummyMovie : Movie = {
        title: "fuck you",
        released:  1,
        tagline: "",
        actors: [],
        directors: [],
        producers: [],
        writers: [],
        reviews: []
    };

    const dummyPerson : Person = {
        name: "",
        born:  1,
        acted: [],
        directed: [],
        produced: [],
        wrote: []
    }
    //Dummy data for the hooks before actual data is ready to be shown
    const [movie, setMovie] = useState(dummyMovie)
    const [person, setPerson] = useState(dummyPerson)


    const store = useDataStore();
    let whichData = useObserver(() => (store.filterProps.get("dataFilterType")))
    let currentResultID = useObserver(() => store.currentResultId);
    let currentPersonID = useObserver(() => store.currentPersonId);

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
                reviews{
                    header
                    review
                    score
                    userId
                }
            }
        }
    `;

    const GET_PERSON_DETAILS = gql`
        {
            Person(_id: ${currentPersonID}){
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



    //Kan ikke flytte all koden inn i if setningen fordi useQuery ikke kan være inne i en conditional
    useEffect(() => {
        if(whichData === "Movie"){
            setQuery(GET_MOVIE_DETAILS);
        }else{
            setQuery(GET_PERSON_DETAILS)
        }
    }, [GET_MOVIE_DETAILS, GET_PERSON_DETAILS, whichData])



    const { loading, error, data } = useQuery(query)
    console.log(data)


    useEffect(() => {
        if(whichData === "Movie" && data) {
            console.log(data)
            if(typeof data.Movie != 'undefined'){
                let currentMovie = data.Movie[0]
                const fuckmovie: Movie = {
                    title: currentMovie.title,
                    released: currentMovie.released,
                    tagline: currentMovie.tagline,
                    actors: currentMovie.persons.map((person: any) => person.name),
                    directors: currentMovie.directors.map((person: any) => person.name),
                    producers: currentMovie.producers.map((person: any) => person.name),
                    writers: currentMovie.writers.map((person: any) => person.name),
                    reviews: currentMovie.reviews.map((review: any) => [review.header, review.review, review.score, review.userId])
                }
                setMovie(fuckmovie)
            }
        }
    }, [data, whichData, store.currentResultId])

    useEffect(() => {
        if(whichData === "Person" && data) {
            console.log(data)
            if(typeof data.Person != 'undefined'){
                let currentPerson = data.Person[0]
                const fuckperson: Person = {
                    name: currentPerson.name,
                    born:  currentPerson.born,
                    acted: currentPerson.acted.map((movie:any) => movie.title),
                    directed: currentPerson.directed,
                    produced: currentPerson.produced,
                    wrote: currentPerson.wrote
                }
                setPerson(fuckperson)
            }
        }
    }, [data, whichData, store.currentPersonId])

    const Reviews = () => {

        let reviewHTMLlist = []
        for(var i=0; i < movie.reviews.length; i++) {
            reviewHTMLlist[i] =
                <div className="reviews">
                    <p>{movie.reviews[i].header}</p>
                    <p>{movie.reviews[i].review}</p>
                    <p>{movie.reviews[i].score}</p>
                    <p>{movie.reviews[i].userId}</p>
                </div>
        }
        return reviewHTMLlist
    }

    if(whichData === "Movie"){
        return (
            <div>
                <h1> {movie.title} </h1>
                <ul> {movie.actors} </ul>
                <ul> {movie.directors} </ul>
                <ul> {movie.producers} </ul>
                <div>
                    {Reviews}
                </div>
            </div>
        );
    }else {
        return (
            <div>
                <h1>{person.name}</h1>
                <h1>Born: {person.born}</h1>
                <ul>{person.acted}</ul>
            </div>
        )

    }
}




export default MovieDescription;
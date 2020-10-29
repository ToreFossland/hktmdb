import { gql, useQuery, useMutation } from '@apollo/client';
import { useObserver } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { useDataStore } from "../context";
import '../styling/search.css';


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
    let refreshFlag = useObserver(() => store.refreshFlag);

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
    
    const DELETE_COMMENT = gql`
        mutation ($header:String!){
            DeleteMovieReview(header:$header){
                header
            }
        }
    `;



    const [deleteComment] = useMutation(DELETE_COMMENT)


    //Kan ikke flytte all koden inn i if setningen fordi useQuery ikke kan være inne i en conditional
    useEffect(() => {
        if(whichData === "Movie"){
            setQuery(GET_MOVIE_DETAILS);
        }else{
            setQuery(GET_PERSON_DETAILS)
        }
    }, [GET_MOVIE_DETAILS, GET_PERSON_DETAILS, whichData])

    const { loading, error, data, refetch } = useQuery(query, {variables:{idMovie:currentResultID, idPerson:currentPersonID},fetchPolicy: "cache-and-network" })
    console.log(data)

    useEffect(() => {
        console.log(refreshFlag)
        console.log("use effect hFlag")
        if(whichData === "Movie" && data) {
            console.log(data)
            if(typeof data.Movie != 'undefined'){
                let currentMovie = data.Movie[0]
                const fuckmovie: Movie = {
                    title: currentMovie.title,
                    released: currentMovie.released,
                    tagline: currentMovie.tagline,
                    actors: currentMovie.persons.map((person: any) => <li>- {person.name}</li>),
                    directors: currentMovie.directors.map((person: any) => <li>- {person.name}</li>),
                    producers: currentMovie.producers.map((person: any) => <li>- {person.name}</li>),
                    writers: currentMovie.writers.map((person: any) => <li>- {person.name}</li>),
                    reviews: currentMovie.reviews.map(function(review: any){
                        return {
                            header: review.header,
                            review: review.review,
                            score: review.score,
                            userId: review.userId}})
                }
                setMovie(fuckmovie)
            }
        }
    }, [data, whichData, currentResultID])

    useEffect(() => {
        refetch()
    },[refreshFlag])

    const test = (userId:String, header:String) => {
        let currentUserId = localStorage.getItem("userID");
        if(userId===currentUserId){
            return (<button id="remove_button" onClick={(e) => {
                deleteComment({variables:{header:header}})
                store.addRefreshFlag(!store.refreshFlag)
            }}>Remove</button>)
        }
        return(<div></div>)
    }


    useEffect(() => {
        if(whichData === "Person" && data) {
            console.log(data)
            if(typeof data.Person != 'undefined'){
                let currentPerson = data.Person[0]
                const fuckperson: Person = {
                    name: currentPerson.name,
                    born:  currentPerson.born,
                    acted: currentPerson.acted.map((movie:any) =><li> - {movie.title}</li>),
                    directed: currentPerson.directed,
                    produced: currentPerson.produced,
                    wrote: currentPerson.wrote
                }
                setPerson(fuckperson)
            }
        }
    }, [data, whichData, currentPersonID])

    if(whichData === "Movie" && currentResultID !== "177"){
        return (
            <div>
                <div id="data_details">
                    <h1> {movie.title} ({movie.released}) </h1>
                    <h6> "{movie.tagline}"</h6>
                    <ul>Actors in this movie: {movie.actors} </ul>
                    <ul>Directors in this movie:{movie.directors} </ul>
                    <ul>Producers of this movie: {movie.producers} </ul>
                    <h2>Reviews:</h2>
                    <div className="reviews">
                    {movie.reviews.map((review: MovieReview, index) => (
                        <div>
                            <h1>{review.header}</h1>
                            <p>{review.review}</p>
                            <p> Score: {review.score}</p>
                            <div>
                                {test(review.userId, review.header)}
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        );
    }else if(whichData === "Person" && currentPersonID !== "172") {
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
    else {
        return <div></div>
    }
}




export default MovieDescription;
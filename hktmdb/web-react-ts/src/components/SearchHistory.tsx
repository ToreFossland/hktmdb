import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import '../index.css';
import { useAuth0 } from '@auth0/auth0-react'



const History = () => {
    
    
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

const AddHistory = () => {
    const [movieTitle, setMovieTitle] = useState("");
    const [movieReleased, setMovieReleased] = useState("");

    const ADD_MOVIE = gql`
    mutation {
        CreateSearchHistory(query: "${movieTitle}", date: "${movieReleased}") {
            query
            date
        }
}
`;
    
    const [addMovie] = useMutation(ADD_MOVIE);

    

    return (
        <div>
            <form>
                <h3> Add a movie: </h3>
                <p>Title:</p>
                <input type="text" onChange={e => setMovieTitle(e.target.value)}/><br></br>
                <p>Release Year</p>
                <input type="text" onChange={e => setMovieReleased(e.target.value)}/><br></br>
                <button onClick={() => addMovie()}> Add Movie</button>
            </form>
        </div>
    );
}


const Query = () => {
    
    
    const GET_QUERY = gql`
    {
        SearchHistory(first:5) {
            me
        }
    }
`;


    let { loading, error, data } = useQuery(GET_QUERY)
    if (error) {
        console.log("hahahahas")
        return <p>Error</p>
    }
    
   
    if (loading) return <p>Fetching movies...</p>

    const movies = data.SearchHistory.map((me: any) => me)
    
    const moviedivs = []
    for(var i=0; i < movies.length; i++) {
        moviedivs[i] = <p>{movies[i].me}</p>
    }

    return (
        <div>
            <h1>What people have searches for</h1>
            <div className="moviediv">{moviedivs}</div>
        </div>
    );
}






export default function SearchHistory() {
/*
    const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user} = useAuth0();

    useEffect(() => {
        const interval = setInterval(() => {
          console.log('This will run every second!');
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    
    
    let temp = user.sub.split("|")[1]

    const Query2 = () => {
        if(typeof temp != 'undefined'){
            return <Query/>
        }
    return <p>User ID eksisterer ikke</p>
    }
*/

    return(
        <div>
            <Query/>
            <History/>
            <AddHistory/>
        </div>
    )
};

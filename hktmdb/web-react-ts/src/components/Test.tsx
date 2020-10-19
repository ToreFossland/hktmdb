import { gql, useQuery } from '@apollo/client';
import React from 'react';

import '../index.css';


const GET_MOVIES = gql`
    {
        Movie
        {
            title
            released
            tagline
        }
    }
`;

const Test = ({ ...props }) => {
    const { loading, error, data } = useQuery(GET_MOVIES)
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>
    console.log(data);
    const movies = data.Movie.map((movie: any) => { if (movie.title.toLowerCase().includes(props.input.toLowerCase())) return movie.title + "(" + movie.released + ")" + ": " + movie.tagline + ", " });
    console.log(movies.length)
    var moviedivs = [];
    for (var i = 0; i < movies.length; i++) {
        moviedivs[i] = <p>{movies[i]}</p>
    }

    return (
        <div>
            {moviedivs}
        </div>
        )
    }


export default Test;
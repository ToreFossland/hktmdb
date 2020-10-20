import React, { useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';


const AddMovie = ({...props}) => {
    const [movieTitle, setMovieTitle] = useState("");
    const [movieReleased, setMovieReleased] = useState("");

    const toInt = function(input: string) {
        return parseInt(input)
    }

    const ADD_MOVIE = gql`
    mutation {
        CreateMovie(title: "${movieTitle}", released: ${toInt(movieReleased)}) {
            title
            released
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


export default AddMovie;
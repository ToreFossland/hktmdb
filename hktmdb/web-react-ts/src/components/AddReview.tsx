import React, { useEffect, useState} from 'react';
import { gql, useMutation} from '@apollo/client';
import { useDataStore } from "../context";
import { useObserver } from 'mobx-react-lite';


const AddMovie = ({...props}) => {
    const [header, setHeader] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [score, setScore] = useState("");
    const userIdentity = localStorage.getItem("userID");

    const store = useDataStore();
    let whichData = useObserver(() => (store.filterProps.get("dataFilterType")))
    let currentResultID = useObserver(() => store.currentResultId);
    console.log(currentResultID)

    const toInt = function(input: string) {
        return parseInt(input)
    }

    const ADD_MOVIE_REVIEW = gql`
        mutation ($header:String, $review:String, $score:Int, $userId:String) {
            CreateMovieReview(header: $header, review: $review, score: $score, userId: $userId) {
                _id
                header
                review
                score
                userId
            }
        }
    `;

const ADD_MOVIE_RELATION = gql`
mutation ($header:String, $review:String, $score:Int, $userId:String) {
    CreateMovieReview(header: $header, review: $review, score: $score, userId: $userId) {
        _id
        header
        review
        score
        userId
    }
}
`;





    const [addMovieReview, runke] = useMutation(ADD_MOVIE_REVIEW);
    

    const submitReviewHandler = async(e:any) => {
        e.preventDefault();
       if(whichData === "Movie"){
            console.log("riktig!")
            try{
                let haakon =  await addMovieReview({ variables: {header: header, review: reviewText, score: toInt(score), userId: userIdentity } })
                console.log(haakon)
                console.log(runke)
            }catch(error) {
                throw error;
            }
        }
        else{
            console.log("dette er ikke lov")
        }
        return false;
    }


    return (
        <div>
            <form>
                <h3> Add a movie: </h3>
                <p>Header:</p>
                <input type="text" onChange={e => setHeader(e.target.value)} required/><br></br>
                <p>Review</p>
                <input type="text" onChange={e => setReviewText(e.target.value)} required/><br></br>
                <p>Score</p>
                <input type="number" onChange={e => setScore(e.target.value)} required/><br></br>
                <button onClick={(e) => {submitReviewHandler(e)}}> Add Movie</button>
            </form>
        </div>
    );
}


export default AddMovie;
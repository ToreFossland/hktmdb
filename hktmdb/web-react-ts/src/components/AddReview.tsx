import React, {useState} from 'react';
import { gql, useMutation} from '@apollo/client';
import { useDataStore } from "../context";
import { useObserver } from 'mobx-react-lite';
import {getNewID2} from "./newId"


const AddMovie = () => {
    const [header, setHeader] = useState("")
    const [reviewText, setReviewText] = useState("");
    const [score, setScore] = useState("");
    const userIdentity = localStorage.getItem("userID");


    const store = useDataStore();
    let whichData = useObserver(() => (store.filterProps.get("dataFilterType")))
    let currentResultID = useObserver(() => store.currentResultId);
    let currentResultTitle = useObserver(() => store.currentResultTitle);
    console.log(currentResultID)

    const toInt = function(input: string) {
        return parseInt(input)
    }

    const ADD_MOVIE_REVIEW = gql`
        mutation getCreateMovieReview($id:ID!, $header:String, $review:String, $score:Int, $userId:String) {
           CreateMovieReview(id:$id, header: $header, review: $review, score: $score, userId: $userId) {
                _id
                id
                header
                review
                score
                userId
            }
        }
    `;

    const ADD_MOVIE_RELATION = gql`
        mutation ($id:ID!, $title:String!){
            AddMovieReviews(from: {id: $id}, to: {title: $title}){
                from{id}
                to{title}
            }
        }
    `;


    const [addMovieReview] = useMutation(ADD_MOVIE_REVIEW);
    const [addRelation] = useMutation(ADD_MOVIE_RELATION);

    const submitReviewHandler = async (e:any) => {
        e.preventDefault();
       if(whichData === "Movie"){
            console.log("riktig!")
            let movieReviewId = getNewID2()
            await addMovieReview({variables: {id: movieReviewId, header:header, review: reviewText, score: toInt(score), userId: userIdentity }})
            console.log(currentResultTitle)
            console.log(movieReviewId)
            await addRelation({variables:{id:movieReviewId, title:currentResultTitle}})
            store.addRefreshFlag(!store.refreshFlag)
        }
        else{
            console.log("dette er ikke lov")
        }
        return false;
    }
    if (currentResultID != "177"){
        return (
            <div> 
                <div id="add_review">
                    <form>
                        <h3> Add a review to the selected movie: </h3>
                        <p>Review Title</p>
                        <input type="text" onChange={e => setHeader(e.target.value)} required/><br></br>
                        <p>Text:</p>
                        <textarea  onChange={e => setReviewText(e.target.value)} required/><br></br>
                        <p>Score (1-10): <input type="number" min="1" max="10" onChange={e => setScore(e.target.value)} required/><br></br></p>
                        
                        <button onClick={(e) => {submitReviewHandler(e)}}> Submit Review</button>
                    </form>
                </div>
            </div>
        );
    }

    else {
        return <div></div>
    }
}


export default AddMovie;
import React, {useState} from 'react';
import { gql, useMutation} from '@apollo/client';
import { useDataStore } from "../context";
import { useObserver } from 'mobx-react';
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
    //query for å legge til moviereview
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

    //query for relasjoner mellom movie og moviereviews
    const ADD_MOVIE_RELATION = gql`
        mutation ($id:ID!, $title:String!){
            AddMovieReviews(from: {id: $id}, to: {title: $title}){
                from{id}
                to{title}
            }
        }
    `;

    //setter score mellom 0 og 10
    const handleScore = (input:string) => {
        if(parseInt(input) > 10) {
            setScore("10");
        }

        else if (parseInt(input) < 1) {
            setScore("1");
        }

        else {
            setScore(input);
        }
    }

    const [addMovieReview] = useMutation(ADD_MOVIE_REVIEW);
    const [addRelation] = useMutation(ADD_MOVIE_RELATION);

    const submitReviewHandler = async (e:any) => {
        e.preventDefault();
        console.log("riktig!")
        let movieReviewId = getNewID2()
        await addMovieReview({variables: {id: movieReviewId, header:header, review: reviewText, score: toInt(score), userId: userIdentity }})
        console.log(currentResultTitle)
        console.log(movieReviewId)
        await addRelation({variables:{id:movieReviewId, title:currentResultTitle}})
        store.addRefreshFlag(!store.refreshFlag)
    }

    if (currentResultID !== "177" && whichData === "Movie"){
        return (
            <div> 
                <div id="add_review">
                    <form>
                        <h3> Add a review to the selected movie: </h3>
                        <p>Review Title</p>
                        <input type="text" onChange={e => setHeader(e.target.value)} required/><br></br>
                        <p>Text:</p>
                        <textarea  onChange={e => setReviewText(e.target.value)} required/><br></br>
                        <p>Score (1-10): <input type="number" min="1" max="10" onChange={e => handleScore(e.target.value)} required/><br></br></p>
                        
                        <button onClick={(e) => {submitReviewHandler(e)}}> Submit Review</button>
                    </form>
                </div>
            </div>
        );
    }

    else {
        return <div><p>You can add a review to a movie here.</p></div>
    }
}


export default AddMovie;
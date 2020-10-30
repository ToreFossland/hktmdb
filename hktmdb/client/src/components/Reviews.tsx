import { gql, useQuery, useMutation } from '@apollo/client';
import { useObserver } from 'mobx-react';
import React, {useEffect} from 'react';
import { useDataStore } from "../context";
import '../styling/search.css';
import { useAuth0 } from "@auth0/auth0-react";
import {getNewID} from "./newId"
import Login from "./Login"


interface MovieReview {
    id:Number
    header: String,
    review: String,
    score: number,
    userId: String
  }

const Reviews = () => {

    const { isAuthenticated } = useAuth0();
    const store = useDataStore();
    let whichData = useObserver(() => (store.filterProps.get("dataFilterType")))
    let currentResultID = useObserver(() => store.currentResultId);
    let refreshFlag = useObserver(() => store.refreshFlag);

    //Henter reviews tilknyttet den valge filmen
    const GET_RELATED_REVIEWS = gql`
     query ($idMovie:ID!){
        Movie(_id: $idMovie){
            reviews{
                id
                header
                review
                score
                userId
                }
            }
        }

    `;

    //Mutation for å slette et review
    const DELETE_COMMENT = gql`
        mutation ($id:ID!){
            DeleteMovieReview(id:$id){
                id
            }
        }
    `;

    const { loading, error, data, refetch} = useQuery(GET_RELATED_REVIEWS, {variables:{idMovie:currentResultID},fetchPolicy: "cache-and-network" })


    const [deleteComment] = useMutation(DELETE_COMMENT)

    useEffect(() => {
        refetch()
    },[refreshFlag])

    //Returnerer alle reviewsene tilknyttet filmen
    const test = (userId:String, id:Number) => {
        let currentUserId = localStorage.getItem("userID");
        if(userId===currentUserId){
            return (<button id="remove_button" onClick={(e) => {
                deleteComment({variables:{id:id}})
                let test = currentResultID
                store.addCurrentResultId("177")
                setTimeout(function(){store.addCurrentResultId(test)}, 500);
            }}>Remove</button>)
        }
        return(<div></div>)
    }
    if(whichData !== "Movie"){return(<div></div>)}

    if (!isAuthenticated) return <div><p>Login to see comments.</p></div>
    
    if (error) return <div><p>error</p></div>
    if (loading) return <div><p>Fetching movies...</p></div>

    try{
        return(
            <div>
                <h2>Reviews:</h2>
                <div className="reviews">
                    {data.Movie[0].reviews.map((review: MovieReview) => (
                        <div key={getNewID()}>
                            <h1>{review.header}</h1>
                            <p>{review.review}</p>
                            <p> Score: {review.score}</p>
                            <div>
                                {test(review.userId, review.id)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }catch(error){}
    
    return (<div><p>No reviews yet</p></div>)
}

export default Reviews

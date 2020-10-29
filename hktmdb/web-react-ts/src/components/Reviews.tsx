import { gql, useQuery, useMutation } from '@apollo/client';
import { useObserver } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { useDataStore } from "../context";
import '../styling/search.css';
import { useAuth0 } from "@auth0/auth0-react";
import getNewID from "./newId"


interface MovieReview {
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


    const GET_RELATED_REVIEWS = gql`
     query ($idMovie:ID!){
        Movie(_id: $idMovie){
            reviews{
                header
                review
                score
                userId
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

    const { loading, error, data, refetch} = useQuery(GET_RELATED_REVIEWS, {variables:{idMovie:currentResultID},fetchPolicy: "cache-and-network" })


    const [deleteComment] = useMutation(DELETE_COMMENT)

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
    console.log(data)
    if(isAuthenticated && data && typeof data.Movie[0].reviews != 'undefined'){
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
                                {test(review.userId, review.header)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    
    
    if (error) return <div><h1>Results:</h1><p>Login to see comments</p></div>
    if (loading) return <div><h1>Results</h1><p>Fetching movies...</p></div>
    return (<div><p>Login to see comments</p></div>)
}

export default Reviews

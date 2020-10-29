import { gql, useQuery } from '@apollo/client';
import { useObserver } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { useDataStore } from "../context";
import '../styling/search.css';
import '../styling/general.css';


const SearchResults = () => {
    const [dataCount, setDataCount] = useState(5);
    const store = useDataStore();
    let searchInput = useObserver(() => (store.filterProps.get("searchInput")))
    let firstYear = useObserver(() => (store.filterProps.get("firstYear")))
    let secondYear = useObserver(() => (store.filterProps.get("secondYear")))
    let movieFilterType = useObserver(() => (store.filterProps.get("movieFilterType")))
    let personFilterType = useObserver(() => (store.filterProps.get("personFilterType")))
    let whichData = useObserver(() => (store.filterProps.get("dataFilterType")))


    useEffect(() => {
        setDataCount(5)
    }, [searchInput, firstYear, secondYear, movieFilterType, whichData])

    useEffect(() => {
        store.addCurrentPersonId("172");
        store.addCurrentResultId("177");
    }, [whichData, searchInput])


    const capitalizeFirstLetters = (input: string) => {
        var splitStr = input.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    const getQueries = function() {
        let GET_DATA;

        if(whichData === "Movie") {
            GET_DATA = gql`
                query movieQuery($offset: Int!){
                    Movie(first:5, offset: $offset, orderBy: ${movieFilterType}_asc, filter: {title_contains: "${capitalizeFirstLetters(searchInput!)}", released_gte: ${firstYear}, released_lte: ${secondYear}}) {
                        _id
                        title
                        released
                    }
                }
            `;

            return GET_DATA;
        }

        else {
            GET_DATA = gql`
                query personQuery($offset: Int!){
                    Person(first:5, offset: $offset, orderBy: ${personFilterType}_asc, filter: {name_contains: "${capitalizeFirstLetters(searchInput!)}", born_gte: ${firstYear}, born_lte: ${secondYear}}) {
                        _id
                        name
                        born
                    }
                }       
            `;

            return GET_DATA;
        }
    }
    

    

    const { loading, error, data, fetchMore } = useQuery(getQueries(), {
        variables: {
            offset: 0
        },
        fetchPolicy: "cache-and-network"
    });
    if (error) return <p>Error</p>
    if (loading) return <p>Fetching movies...</p>

    const getDataElements = function() {
        let dataElements;
        if(whichData == "Movie"){
            dataElements = data.Movie.map((movie: any) => movie);
        }

        else {
            dataElements = data.Person.map((movie: any) => movie);
        }

        return dataElements;
    }
    
    
    const moviedivs = [];
    if(whichData == "Movie") {
        for(var i=0; i < getDataElements().length; i++) {
            moviedivs[i] = <li key={getDataElements()[i]._id} value={i} onClick={(event) => showDataDetails(event)}>{getDataElements()[i].title} ({getDataElements()[i].released}) </li>
        }
    }
    const persondivs = [];
    if(whichData == "Person") {
        for(var j=0; j < getDataElements().length; j++) {
            persondivs[j] = <li key={getDataElements()[j]._id} value={j} onClick={(event) => showDataDetails(event)}>{getDataElements()[j].name} ({getDataElements()[j].born}) </li>
        }
    }
    

    function showDataDetails(event: any) {
        if(whichData === "Movie"){
            store.addCurrentResultId(getDataElements()[event.target.value]._id)
            store.addCurrentResultTitle(getDataElements()[event.target.value].title)
        }else{
            store.addCurrentPersonId(getDataElements()[event.target.value]._id)
        }
    }

    const fetch = function(input: number){ 
        if(whichData === "Movie") {
            fetchMore({
                variables: {
                offset: input
            },
            updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
                Movie: [...prev.Movie, ...fetchMoreResult.Movie]
            });
            }
        })
        }

        else {
            fetchMore({
                variables: {
                offset: input
            },
            updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
                Person: [...prev.Person, ...fetchMoreResult.Person]
            });
            }
        })
        }
    }
    
    var moreResults = function(input: number) {
        if(input === dataCount) {

            return <button id="showMoreButton" onClick={ () => {setDataCount(dataCount+5); fetch(input)}}>Show more</button>
            
        }
    }


    return (
        <div>
            <ul className="moviediv">{moviedivs} {persondivs}</ul>
            {moreResults(getDataElements().length)}
        </div>
    );
}


export default SearchResults;

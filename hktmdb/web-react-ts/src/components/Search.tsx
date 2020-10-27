import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useDataStore } from "../context";


const SearchInput = () => {
    const store = useDataStore();

    const handleChange = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "."
        }
        store.addFilterProps("searchInput", value);
    }
    return (
        <div>
            <form>
                <h3> Search for a movie: </h3>
                <input type="text" onChange={handleChange}/>
            </form>
        </div>
    );
}


const SearchYear = () => {
    const store = useDataStore();

    const handleChange1 = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "0"
        }

        if(value > 2020) {
            value = "2020"
        }

        if(value < 0) {
            value = "0"
        }
        store.addFilterProps("firstYear", value);
    }

    
    const handleChange2 = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "2020"
        }

        if(value > 2020) {
            value = "2020"
        }

        if(value < 0) {
            value = "0"
        }
        store.addFilterProps("secondYear", value);
    }
    return (
        <div>
            <h3> Filter between years: </h3>
            <input placeholder="1960" type="number" min="0" max="2020" onChange={handleChange1}/>-
            <input placeholder="2020" type="number" min="0" max="2020" onChange={handleChange2}/>
        </div>
    );
}



const SearchType = () => {
    const store = useDataStore();

    const handleChange = (event: any) => {
        store.addFilterProps("filterType", event.target.value);
    }
    
    return (
        <div onChange={handleChange}>
            Sort by: <br></br>
            <input value="title" type="radio" name="filter" defaultChecked/>Title
            <input value="released" type="radio" name="filter"/>Year
        </div>
    );
}





export default function Search() {
    return(
        <div>
            <SearchInput/>
            <SearchYear/>
            <SearchType/>
        </div>
    )
};

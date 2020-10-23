import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useDataStore } from "../context";




const Search = () => {
    const store = useDataStore();

    const handleChange = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "."
        }
        store.addFilterProps("searchInput", value);
        console.log(store.filterProps.get("searchInput"))
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


export default Search;

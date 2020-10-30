import React, { useState } from 'react';
import { useDataStore } from "../context";
import '../styling/search.css';
import '../styling/general.css';

const SearchInput = () => {
    const store = useDataStore();

    const handleChange = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "---"
        }
        store.addFilterProps("searchInput", value);
    }
    return (
        <div>
            <form>
                <div id="search_input">
                    <img alt="pic" style={{verticalAlign:-7, opacity: 0.8}}  src={require("../resources/search.svg")}/>
                    <input type="text" onChange={handleChange}/>
                </div>
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
            <p> Filter between years: </p>
            <div>
                <input style={{height: 25}} placeholder="1920" type="number" min="0" max="2020" onChange={handleChange1}/>-
                <input style={{height: 25}} placeholder="2020" type="number" min="0" max="2020" onChange={handleChange2}/>
            </div>
        </div>
    );
}



const SearchSort = () => {
    const store = useDataStore();

    const handleChange = (event: any) => {
        let value = event.target.value;
        store.addFilterProps("movieFilterType", value);

        if(value === "title") {
            store.addFilterProps("personFilterType", "name");
        }

        if(value === "released") {
            store.addFilterProps("personFilterType", "born");
        }
    }
    
    
    return (
        <div onChange={handleChange}>
            <p>Sort by:</p>
            <p><input value="title" type="radio" name="filter" defaultChecked/>Title</p>
            <p><input value="released" type="radio" name="filter"/>Year</p>
        </div>
    );
}

const SearchType = () => {
    const store = useDataStore();

    const [type, setType] = useState("Movie");
    const [img, setImg] = useState("movie.svg");

    const handleChange = () => {
        if(type === "Movie") {
            setType("Person");
            setImg("person.svg");
            store.addFilterProps("dataFilterType", "Person");
        }

        else {
            setType("Movie");
            setImg("movie.svg");
            store.addFilterProps("dataFilterType", "Movie");
        }
    }
    
    
    return (
        <div>
            <p>Searching for: <button id="search_type" onClick={handleChange}><img alt="pic" style={{verticalAlign:-7, opacity: 0.8}} src={require("../resources/"+img)}/>{type}</button></p>
        </div>
    );
    }




export default function Search() {

    const [filterShow, setFilterShow] = useState("none");
    const [img, setImg] = useState("more.svg")
    const showFilterOptions = () => {
        if(filterShow === "none") {
            setFilterShow("block");
            setImg("less.svg");
        }

        else {
            setFilterShow("none");
            setImg("more.svg");
        }
}
    return(
        <div>
            <div>
                <SearchInput/>
                <SearchType/>
            </div>
            
            <button id="buttonShowFilter" onClick={() => showFilterOptions()}>Filter options:<img alt="pic" style={{verticalAlign:-7}} src={require("../resources/expand_"+img)}/></button>
            <div style={{display: filterShow}} id="filter_container">
                <SearchSort/>
                <SearchYear/>
            </div>
        </div>
    )
};

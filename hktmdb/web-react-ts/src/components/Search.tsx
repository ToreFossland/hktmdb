import React from 'react';


const Search = ({...props}) => {

    const handleChange = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "."
        }
        props.onChange(value);
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
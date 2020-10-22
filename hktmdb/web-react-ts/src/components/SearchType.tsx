import React from 'react';



const SearchType = ({...props}) => {

    const handleChange = (event: any) => {
        props.onChange(event.target.value);
    }
    
    return (
        <div onChange={handleChange}>
            Sort by: <br></br>
            <input value="title" type="radio" name="filter" defaultChecked/>Title
            <input value="released" type="radio" name="filter"/>Year
        </div>
    );
}


export default SearchType;
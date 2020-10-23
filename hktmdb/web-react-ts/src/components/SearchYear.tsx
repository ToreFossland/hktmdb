import React from 'react';

const SearchYear = ({...props}) => {
    
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
        props.onChange1(value);
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
        props.onChange2(value);
    }
    return (
        <div>
            <form>
                <h3> Filter between years: </h3>
                <input placeholder="1960" type="number" min="0" max="2020" onChange={handleChange1}/>-
                <input placeholder="2020" type="number" min="0" max="2020" onChange={handleChange2}/>
            </form>
        </div>
    );
}


export default SearchYear;
import React from 'react';


const Input = ({...props}) => {

    const handleChange = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "."
        }
        props.onChange(value);
    }
    return (
        <form id="input">
            <input type="text" onChange ={handleChange}/>
        </form>
    );
}


export default Input;
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import '../index.css';



const SearchHistory = ({...props}) => {
    
    
    const GET_MOVIES = gql`
    {
        Movie {
            title
        }
    }
`;
}


export default SearchHistory;
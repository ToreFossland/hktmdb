import { render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from "react";
import Login from '../components/Login'



const uri = process.env.REACT_APP_GRAPHQL_URI || '/graphql'
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri,
    cache
})

test('renders a message', () => {
    const container = render(
        <ApolloProvider client={client}>
        <Login />
        </ApolloProvider>,)

    let counter = 0;

    const test = container.getAllByRole("button");

    for(let item of test){
        expect(item).toBeInTheDocument()
        counter++;
    }
    expect(counter).toEqual(1)
})
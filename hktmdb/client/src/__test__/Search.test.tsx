import { render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Search from "../components/Search";
import userEvent from '@testing-library/user-event'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from "react";

const uri = process.env.REACT_APP_GRAPHQL_URI || '/graphql'
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri,
    cache
})

test('renders a message', () => {
    const container = render(
        <ApolloProvider client={client}>
            <Search />
        </ApolloProvider>,)

    const input = container.getByLabelText('search_input')

    expect(input).toBeInTheDocument()
})
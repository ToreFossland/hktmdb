

describe('MovieFetch', () => {
    it('Fetches a Movie', () => {
        cy.visit('localhost:3000')
        cy.waitForReact(1000, '#root');

        cy.react('SearchType', {
            state: "Movie"
        })


        cy.react('SearchInput').type("The Matrix")


        cy.react('SearchResults').contains("The Matrix")
    })
})


describe('PersonFetch', () => {
    it('Fetches a Person', () => {
        cy.visit('localhost:3000')
        cy.waitForReact(1000, '#root');

        cy.react('SearchType', {
            state: "Movie"
        })


        cy.react('SearchType').click()

        cy.react('SearchType', {
        state: "Person"
    })

        cy.react('SearchInput').type("Keanu Reeves")
        cy.react('SearchResults').contains("Keanu Reeves")


    })
})
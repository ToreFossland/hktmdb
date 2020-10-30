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

describe('YearTitleSwtich', () => {
    it('Checks order of movies when we switch filter settings', () => {
        cy.visit('localhost:3000')
        cy.waitForReact(1000, '#root');

        cy.react('SearchType', {
            state: "Movie"
        })

        cy.react('SearchInput').type("b")
        cy.react('SearchResults').first().contains("Bicentennial Man")


        cy.react('FilterButton').click()

        cy.react('SearchSort').click(140,60)

        cy.react('SearchResults').first().contains("Stand By Me")
    })
})

describe('Test if MovieDescription has right output', () => {
    it('Checks order of movies when we switch filter settings', () => {
        cy.visit('localhost:3000')
        cy.waitForReact(1000, '#root');

        cy.react('SearchType', {
            state: "Movie"
        })

        cy.react('SearchInput').type("The Matrix")
        cy.react('SearchResults').click(500, 60)
        cy.react('MovieDescription').find('h6').contains('Welcome to the Real World')
        cy.react('MovieDescription').find('ul').contains('Keanu Reeves')
    })
})


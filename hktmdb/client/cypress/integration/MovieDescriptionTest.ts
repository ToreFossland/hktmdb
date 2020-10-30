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

Cypress._.times(3, () => {
    it('Testing only de privacy policy page',() =>{
        cy.visit('./src/privacy.html')
        cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
        })

})
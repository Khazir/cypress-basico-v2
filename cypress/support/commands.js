Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{

    cy.get('#firstName').should('be.visible').type('Daniel').should('have.value', 'Daniel')
    cy.get('#lastName').should('be.visible').type('Tiburcio').should('have.value', 'Tiburcio')
    cy.get('#email').should('be.visible').type('daniel@gmail.com').should('have.value', 'daniel@gmail.com')
    cy.get('#open-text-area').should('be.visible').type('test')
    cy.contains('button', 'Enviar').should('be.visible').click()

})

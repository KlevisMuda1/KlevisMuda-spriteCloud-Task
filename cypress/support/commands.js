Cypress.Commands.add('clickOnTextLink',(text)=>{
    cy.get('h3').contains('a', text, {matchCase: false, timeout: 2000})
        .click()
})
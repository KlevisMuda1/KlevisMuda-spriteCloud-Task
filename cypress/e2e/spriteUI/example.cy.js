/// <reference types="cypress" />

describe('Test different feature of uitestingplayground', () => {

    it('Test dynamicID', () => {
        cy.visit('/dynamicid')
        cy.get('[class="btn btn-primary"]').click()
        cy.url().should('include', '/dynamicid')
    })

    it('Test Load Delays', () => {
        cy.visit('/')
        cy.clickOnTextLink('LoAad Delay')
        cy.get('[class="btn btn-primary"]', {timeout: 20000}).should('be.visible')
    })

    it('Test Hidden Layers', () => {
        cy.visit('/hiddenlayers')
        // Check Blue button is not existing
        cy.get('#blueButton').should('not.exist')
        cy.get('#greenButton')
            .should('be.visible')
            .should('have.css', 'background-color', 'rgb(40, 167, 69)')

        //Check after click on green button, blue button displayed and color changed
        cy.get('#greenButton').click().then(() => {
            cy.get('#blueButton')
                .should('be.visible')
                .should('have.css', 'background-color', 'rgb(0, 123, 255)')
        })

        //Check user cannot click again in the green button and warning text displayed
        cy.get('#greenButton').click({force: true}).then(() => {
            cy.get('.bg-warning').should('have.text', 'User can not click green button in the current application state!');
        })
    })

    it.skip('Test AJAX Data', () => {
        cy.visit('/ajax')
        cy.intercept('GET', '/ajaxdata').as("response")

        cy.get('#ajaxButton').click()

        cy.wait('@response', {timeout: 30000}).then(() => {
            cy.get("#bg-success").should("have.text", "Data loaded with AJAX get request.")
        })
    })

    it('Test Client Side Delay', () => {
        cy.visit('/clientdelay')

        cy.get('#ajaxButton').click()

        cy.get('#spinner', {timeout: 30000}).should('not.be.visible').then(() => {
            cy.get(".bg-success").should("have.text", "Data calculated on the client side.")
        })
    })

    it('Test Mouse Over', () => {
        cy.visit('/mouseover')

        cy.get('.text-primary').should('have.attr', 'title', 'Click me')
        // cy.get('.text-primary').trigger('mouseover').should('have.attr', 'title', 'Active Link')

        cy.get('.text-primary').click().then(() => {
            cy.get('#clickCount').should('have.text', 1)
        })

        cy.get('#clickCount').click()
        cy.get('.text-primary').dblclick().then(() => {
            cy.get('#clickCount').should('have.text', 3)
        })
    })

    it('Test Dynamic Tabler', () => {
        cy.visit('/dynamictable')

        cy.get('.bg-warning').then(($el) => {
            //Split text highlight in Array
            const labeledText = $el.text().split(' ')
            cy.log(labeledText)

            //Fin index for column where CPU is located, then find index for row where Chrome (or labeledText[0]) is located.
            cy.get('[role="rowgroup"]').eq(0).find('span').each(($row, rowIndex) => {
                const t = $row.text();
                // matching criteria
                if (t.includes('CPU')) {
                    cy.get('[role="rowgroup"]').eq(1).find('[role="row"] [role="cell"]:nth-child(1)').each(($cell, colIndex) => {
                        const cellText = $cell.text();
                        // matching criteria
                        if (cellText === labeledText[0]) {
                            // The index (rowIndex, colIndex) is found!
                            // We are increment by one because first index in nth-child starts from 1
                            const element = `:nth-child(3) > :nth-child(${colIndex + 1}) > :nth-child(${rowIndex + 1})`
                            cy.get(element).should('have.text', labeledText[2])
                        }
                    })
                }
            })
        })
    })
})
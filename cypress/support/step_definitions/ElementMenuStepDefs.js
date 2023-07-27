import {Before, Given, When, And, Then} from "@badeball/cypress-cucumber-preprocessor";

const {ElementMenu} = require('../locators/DemoElements')
Given("I go to page {string} of the application", (page) => {
    cy.visit(Cypress.env('demoBaseUrl') + `/${page}`)
});
Then('I go to submenu {string} of the application', (menu) => {
    cy.get(ElementMenu.submenuShown).contains(menu).click({force: true})
    cy.get(ElementMenu.menuTitle).should('contain.text', menu)
});
Then('Click on {string} button', (button) => {
    cy.get('button[class="btn btn-primary"]').contains(button, {matchCase: false}).click()
});

Then('Fill the Registration Form', (datatable) => {
    datatable.raw().forEach((row) => {
        cy.get('.form-label').contains(row[0])
            .parent().siblings().find('input')
            .clear().type(row[1])
    })
});
Then('Check that Registration Form is saved with first name {string}', (firstName, datatable) => {
    cy.get('.rt-tr-group .rt-tr > :nth-child(1)').each(($el, index) => {
        const text = $el.text()
        if (text === firstName) {

            datatable.raw().forEach((row) => {
                let i = 1
                let j = 1
                cy.log(text, index)
                const rowOfFirstname = `.rt-tr-group:nth-child(${index + 1})`
                cy.get(rowOfFirstname).find('.rt-td').as('details')
                cy.get('@details').eq(i++).should('have.text', row[j++])
            })
        }
    })
});
Then('Fill or Select the fields of Student Registration Form', (datatable) => {
    datatable.raw().forEach((row) => {
        switch (row[0].toLowerCase()) {
            case 'first name':
                cy.get('#firstName').type(row[1])
                break;
            case 'last name':
                cy.get('#lastName').type(row[1])
                break;
            case 'email':
            case 'mobile':
            case 'subjects':
                cy.get('.form-label').contains(row[0]).parents('[class="mt-2 row"]').find('input').type(row[1])
                break;
            case 'current address':
                cy.get('#currentAddress').type(row[1], {delay: 0})
                break;
            // Values to be used: Male, Female or Other
            case 'gender':
                const el = `input[value="${row[1]}"]`
                cy.get(el).check({force: true})
                    .should('be.checked')
                break;
            // You can check more than one checkbox
            case 'hobbies':
                cy.contains('label', row[1]).parent()
                    .find('input').check({force: true})
                    .should('be.checked')
                break;
            case 'state':
                cy.get('#state').click()
                cy.contains('div', row[1]).click({force: true})
                break;
            case 'city':
                cy.get('#city').click()
                cy.contains('div', row[1]).click({force: true})
                break;
            case 'picture':
                const filepath = `cypress/fixtures/${row[1]}`
                cy.get('#uploadPicture').selectFile(filepath, {action: 'drag-drop'})
                break;
            case 'date of birth':
                let date = row[1].split(' ')
                cy.log(date)
                cy.get('#dateOfBirthInput').click()
                cy.get('[class="react-datepicker__year-select"]').select(date[2])
                cy.get('[class="react-datepicker__month-select"]').select(date[1])
                cy.get('[class="react-datepicker__month"]').find('div[class*="react-datepicker__day"]')
                    .contains(date[0]).click()
            default:
                cy.log('Please check you label if it is correct')
        }
    })
});
Then('Check that Student Registration Form is saved',  (datatable) => {
    cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form')

    datatable.hashes().forEach((row) => {
        cy.log(row.Label);
        cy.log(row.Value);
        cy.get('.modal-body tbody').contains('td', row.Label)
            .siblings().should('have.text', row.Value)
    })
});
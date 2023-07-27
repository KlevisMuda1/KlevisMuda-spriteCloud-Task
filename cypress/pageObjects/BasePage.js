export class BasePage {

    static click(selector) {
        cy.get(selector).click()
    }

    static clickMultiple(selector) {
        cy.get(selector).click({multiple: true})
    }

    static type(selector, message) {
        cy.get(selector).clear().type(message)
    }

    static isVisible(selector) {
        cy.get(selector).should("be.visible")
    }

    static isNotVisible(selector) {
        cy.get(selector).should("not.be.visible")
    }

    static doesNotExist(selector) {
        cy.get(selector).should("not.exist")
    }

    static visitPage(page) {
        cy.visit(page, {failOnStatusCode: false})
    }

    static hasText(selector, text) {
        cy.get(selector).should('have.text', text).and('be.visible')
    }

    static verifyUrl(url) {
        cy.url().should("eq", Cypress.config("baseUrl") + url)
    }

    static arrayToHash(array) {
        return array.map((val) => {
            let temp = {};
            temp[val[0]] = val[1];
            return temp;
        });
    }

}


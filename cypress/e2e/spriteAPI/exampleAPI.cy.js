import { dog } from '../../fixtures/apiConstants/pet'
describe('Test API', () => {

    it('Add a new pet to the store and validated response', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/pet`,
            body:
                dog

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(dog.id)
            expect(response.body.category.name).to.eq('German Shepherd')
            expect(response.body.name).to.eq('Lesi')
            expect(response.body.tags[0].name).to.eq('boss')
            expect(response.body.status).to.eq('available')
            cy.log(response.body.id)
        });
    })

    it('Find pet by Status that exists', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/pet/findByStatus?status=available`,

        }).then((response) => {
            expect(response.status).to.eq(200)
        });
    })

    it('Find pet by Status that does not exists', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/pet/findByStatus?status=rent`,

        }).then((response) => {
            expect(response.status).to.eq(200) //As in swagger it should be 400
            expect(response.body[0]).to.undefined // So it is empty body
        });
    })

    it('Find by pet ID', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/pet/${dog.id}`,

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(dog.id)
            expect(response.body.category.name).to.eq('German Shepherd')
            expect(response.body.name).to.eq('Lesi')
            expect(response.body.tags[0].name).to.eq('boss')
            expect(response.body.status).to.eq('available')
            cy.log(response.body.id)
        });
    })

    it('Update a pet in the store with form data', () => {

        const formData = {
            name: 'Lesiiiiiiiii',
            status: 'sold',
        };

        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiBaseUrl')}/pet/${dog.id}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: true, // This tells Cypress to encode the data as x-www-form-urlencoded
            body: formData,

        }).then((response) => {
            expect(response.status).to.eq(200)
        });
    })

    it('Find by pet ID then check new name and status', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/pet/${dog.id}`,

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('Lesiiiiiiiii')
            expect(response.body.status).to.eq('sold')

        });
    })

    it('Delete a pet', () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('apiBaseUrl')}/pet/${dog.id}`,

        }).then((response) => {
            expect(response.status).to.eq(200)

        });

        // Delete again same pet and check status code
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('apiBaseUrl')}/pet/${dog.id}`,
            failOnStatusCode: false //This command should be added when status code is 404

        }).then((response) => {
            expect(response.status).to.eq(404)

        });
    })

    it('Find by pet ID then check pet not found because it is deleted', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('apiBaseUrl')}/pet/${dog.id}`,
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.message).to.eq('Pet not found')

        });
    })


})
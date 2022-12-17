import { BasePage } from "./BasePage";

const CONNECT_WALLET_BUTTON = "[data-cy='connect-wallet-button']"


export class DashboardPage extends BasePage {

    static selectMockAsWallet(wallet) {
        // this.clickMultiple(CONNECT_WALLET_BUTTON)
        cy.get(CONNECT_WALLET_BUTTON).eq(1).click({ force: false })
        this.clickOnTexByTag('div', wallet)
    }

    static selectGoerliAsNetwork(network) {
        this.clickOnButton('Polygon')
        this.clickOnButton('Testnets')
        this.clickOnTexByTag('div', network)
    }

    static checkErrorMessage(message){
        this.verifyText(message)
    }


}
import { BasePage } from "./BasePage";

const PUBLIC_ADDRESS_SEARCH = "[data-cy='address-button']"
const RECEIVER_INPUT_FIELD = "[placeholder='Address or ENS']"
const SELECT_TOKEN_DROPDOWN = "[data-cy='select-token-button']"
const  FLOW_RATE_FIELD = "[class='MuiInputBase-input MuiOutlinedInput-input css-9r4dl7']"

export class SendStreamPage extends BasePage{

    static fillSendStremRequirements(walletAddress, takenType, flowRate){
        this.click(PUBLIC_ADDRESS_SEARCH)
        this.type(RECEIVER_INPUT_FIELD, walletAddress)
        cy.wait(2000)
        this.click(SELECT_TOKEN_DROPDOWN)
        this.clickOnTexByTag('h6', takenType)
        cy.wait(2000)
        this.type(FLOW_RATE_FIELD, flowRate)

    }
}
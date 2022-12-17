/// <reference types="cypress" />
import { BasePage } from "../pageObjects/BasePage";
import { DashboardPage } from "../pageObjects/DashboardPage"
import { SendStreamPage } from "../pageObjects/SendStreamPage";

describe('Check some Error Messages', () => {

  beforeEach('Select Mock as wallet and Goerli network', () => {
    BasePage.visitWithMockedWallet("/")
    DashboardPage.selectMockAsWallet('Mock')
    cy.wait(500)
    DashboardPage.selectGoerliAsNetwork('Goerli')
  })

  it('Check Error text when claiming tokens from the Dashboard page', () => {
    BasePage.clickOnTexByTag('a', 'Claim')
    BasePage.clickOnButton('Claim')
    DashboardPage.checkErrorMessage('Something went wrong, please try again')
  })

  it('Check Error text when using the max button with ETH in Wrap page', () => {
    BasePage.clickOnTex('Wrap')
    BasePage.clickOnButton('MAX')
    DashboardPage.checkErrorMessage('You are wrapping out of native asset used for gas. You need to leave some gas tokens for the transaction to succeed.')

  })

  it('Check Error text if amount is bigger than balance', () => {
    BasePage.clickOnTex('Wrap')
    DashboardPage.enterAmountToWrap(0.2)
    DashboardPage.checkErrorMessage('You do not have enough balance.')

  })

  it('Check Error text if user send to himself', () => {
    BasePage.clickOnTexByTag('h6', 'Send Stream')
    SendStreamPage.fillSendStremRequirements('0xD92ea85056AB223a279Cd8dEf240cB4F0F7a24aa', 'ETHx', 0.12)
    DashboardPage.checkErrorMessage('You can\'t stream to yourself.')
  })
})
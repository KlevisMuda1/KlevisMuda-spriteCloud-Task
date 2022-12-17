/// <reference types="cypress" />
import {BasePage} from "../pageObjects/BasePage";
import { DashboardPage } from "../pageObjects/DashboardPage"

describe('Add your test cases here', () => {

  beforeEach('Select Mock as wallet and Goerli network', ()=>{
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

  it.only('Check Error text when using the max button with ETH in Wrap page', ()=>{
    BasePage.clickOnTex('Wrap')
    BasePage.clickOnButton('MAX')
    DashboardPage.checkErrorMessage('You are wrapping out of native asset used for gas. You need to leave some gas tokens for the transaction to succeed.')

  })
})
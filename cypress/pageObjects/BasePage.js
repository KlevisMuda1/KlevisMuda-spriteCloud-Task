import HDWalletProvider from "@truffle/hdwallet-provider";
import {ethers} from "ethers";

export class BasePage {

    static visitWithMockedWallet(page) {
        cy.visit(page, {
            onBeforeLoad: (win) => {
                const hdwallet = new HDWalletProvider({
                    privateKeys: ["4096b4d75e5351653841c31068644742c63f947382461748c2b7823ca971c237"],
                    url: "https://rpc-endpoints.superfluid.dev/eth-goerli",
                    chainId: 5,
                    pollingInterval: 1000,
                });
                win.mockSigner = new ethers.providers.Web3Provider(hdwallet).getSigner();
            }

        })

    }

    static click(selector){
        cy.get(selector).click()
     }
 
     static clickMultiple(selector){
         cy.get(selector).click({ multiple:true })
     }

     static clickForce(selector){
        cy.get(selector).click({ force:true })
    }

    static verifyText(text){
        cy.contains(text).should('be.visible')
    }

    static clickOnButton(buttonTexk){
        cy.get('button').contains(buttonTexk).click({force: true})
    }

    static clickOnTexByTag(tag, text){
        cy.get(tag).contains(text).click()
    }
      
    static clickOnTex(text){
        cy.contains(text).click({force: false})
    }
}


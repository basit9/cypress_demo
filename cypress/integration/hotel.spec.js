/// <reference types="Cypress"/>

describe('Hotel Task',()=>{
    beforeEach(() => {
        cy.fixture('login_creds').as('data');
      });

      it('Make an enquiry', function () {
        cy.visit('https://automationintesting.online/');
        cy.get('[data-testid=ContactName]').type('Basit');
        cy.get('[data-testid=ContactEmail]').type('basit@example.com');
        cy.get('[data-testid=ContactPhone]').type('12345678900');
        cy.get('[data-testid=ContactSubject]').type('Double Room Enquiry');
        cy.get('[data-testid=ContactDescription]').type('Hi there! got any available rooms ?');
        cy.get('#submitContact').click();
        cy.get(':nth-child(2) > div > h2').should('have.text', 'Thanks for getting in touch Basit!');
      });

      it('Login to Admin panel', function () {
        cy.visit('https://automationintesting.online/#/admin');
        const { username, password } = this.data.validCredentials;
        cy.login(username, password);
        cy.get('#frontPageLink').should('be.visible');
      });
      
      it('Verify Enquiry', function () {
        cy.get('.order-3 > .navbar-nav > :nth-child(1) > .nav-link').click();  
        cy.get('[data-testid=messageDescription1] > p').should('have.text', 'Double Room Enquiry');
        cy.get('[data-testid=message1] > p').should('have.text', 'Basit');
      });
})

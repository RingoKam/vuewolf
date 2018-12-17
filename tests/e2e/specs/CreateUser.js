// https://docs.cypress.io/api/introduction/api.html

describe('Test CreateUser', () => {
  it('Create a new user should add user in localstorage and move to /lobby', () => {
    cy.visit('/CreateUser');
    cy.get('[data-cy=username-input]').type("cypress_tester");
    cy.get('[data-cy=username-submit]').click().should(() => {
      expect(localStorage.getItem("player")).to.not.be.null;
    }); 
    cy.url().should("include", "/Lobby");
  })
})

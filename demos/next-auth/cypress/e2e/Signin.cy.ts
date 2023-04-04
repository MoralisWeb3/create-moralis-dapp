describe('Signin', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });
  it('Successfully renders "Web3 Authentication" header', () => {
    cy.get('h3:contains("Web3 Authentication")');
  });
});

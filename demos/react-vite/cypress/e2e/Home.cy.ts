describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Successfully renders "Get Ethereum Token Balance" header', () => {
    cy.get('h4:contains("Get Ethereum Token Balance")');
  });
});

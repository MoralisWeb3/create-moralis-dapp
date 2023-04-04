describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Successfully renders "Vite React Moralis Template" header', () => {
    cy.get('h1:contains("Vite React Moralis Template")');
  });
});

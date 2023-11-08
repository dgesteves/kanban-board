describe('e2e', () => {
  it('should display empty boards screen when no boards exist', () => {
    cy.visit('/');
    cy.get('p').should(
      'contain',
      "Looks like you don't have any kanban boards created currently, stat by creating a new board."
    );
    cy.get('button').should('contain', 'Create New Board');
  });

  it('should create a new board from empty state screen button', () => {
    cy.visit('/');
    cy.get('[data-cy="create-board-button-empty-state"]').click();
    cy.get('input').type('Board 1');
    cy.get('[data-cy="create-board-modal-create-button"]').click();
  });

  it('should create a new board from header button', () => {
    cy.visit('/');
    cy.get('button').contains('Create New Board').click();
    cy.get('input').type('Board 2');
    cy.get('[data-cy="create-board-modal-create-button"]').click();
  });
});

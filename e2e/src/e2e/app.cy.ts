describe('e2e', () => {
  it('should display empty boards screen when no boards exist', () => {
    cy.visit('/');
    cy.get('[data-cy="empty-boards-text"]').should('exist');
  });

  it('should create a new board from empty state screen button', () => {
    cy.visit('/');
    cy.get('[data-cy="create-board-button-empty-state"]').click();
    cy.get('input').type('Board 1');
    cy.get('[data-cy="create-board-button-modal"]').click();

    cy.get('button').contains('Create New Card').click();
    cy.get('[data-cy="card-title"').first().type('Card 1');
    cy.get('textarea').type('Card 1 description');
    cy.get('[data-cy="create-card"]').click();

    cy.get('button').contains('Create New Card').click();
    cy.get('[data-cy="card-title"').first().type('Card 2');
    cy.get('textarea').type('Card 2 description');
    cy.get('[data-cy="create-card"]').click();

    const dataTransfer = new DataTransfer();

    cy.get('[data-cy="card-to-drag"]')
      .first()
      .trigger('dragstart', { dataTransfer });
    cy.get('[data-cy="column drop zone"]')
      .last()
      .trigger('drop', { dataTransfer });

    cy.get('[data-cy="card-to-drag"]')
      .first()
      .trigger('dragstart', { dataTransfer });
    cy.get('[data-cy="column drop zone"]')
      .last()
      .trigger('drop', { dataTransfer });
  });
});

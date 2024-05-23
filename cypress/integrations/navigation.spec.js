describe('Navigation', () => {
  it('navigates between different sections', () => {
    // Visit the home page
    cy.visit('http://localhost:3000')

    // Click on the link to the dashboard
    cy.get('a[href="http://localhost:3000/dashboard"]').click()

    // Verify that we've navigated to the dashboard
    cy.url().should('include', '/dashboard')

    // Click on the link to the projects page
    cy.get('a[href="http://localhost:3000/dashboard/projects"]').click()

    // Verify that we've navigated to projects
    cy.url().should('include', '/projects')

    // Click on the link to the tracker page
    cy.get('a[href="http://localhost:3000/dashboard/tracker"]').click()

    // Verify that we've navigated to tracker
    cy.url().should('include', '/tracker')
    
    // Click on the link to the invoices page
    cy.get('a[href="http://localhost:3000/dashboard/invoices"]').click()

    // Verify that we've navigated to invoices
    cy.url().should('include', '/invoices')

    // Click on the link to the customers page
    cy.get('a[href="http://localhost:3000/dashboard/customers"]').click()

    // Verify that we've navigated to customers
    cy.url().should('include', '/customers')
  })
})

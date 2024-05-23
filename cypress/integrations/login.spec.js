describe('Login', () => {
    it('logs in with correct credentials', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name=email]').type('testuser')
      cy.get('input[name=password]').type('testpassword')
      cy.get('button[type=submit]').click()

      // Check if login was successful
      cy.url().should('include', '/dashboard')
    })
})
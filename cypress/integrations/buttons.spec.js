describe('Button Clicks', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/dashboard/invoices')
    })
  
    it('clicks on different buttons', () => {
      cy.contains('Create Invoice').click()

      // cy.contains('Update Invoice').click()

      // cy.contains('Delete Invoice').click()
    })
})

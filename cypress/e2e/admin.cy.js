describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8000')
    //login
    cy.get(':nth-child(2) > .form-control').type("user@gmail.com")
    cy.get(':nth-child(3) > .form-control').type("password")
    cy.get('.btn').click()
    //logout
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click()
    cy.get('.text-danger').click()
  })
})
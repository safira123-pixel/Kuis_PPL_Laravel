describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8000')
    //login
    cy.get(':nth-child(2) > .form-control').type("superadmin@gmail.com")
    cy.get(':nth-child(3) > .form-control').type("password")
    cy.get('.btn').click()
    //CRUD User List
    cy.get('.form-inline > .navbar-nav > :nth-child(1) > .nav-link').click()
    cy.get(':nth-child(2) > .has-dropdown > span').click()
    cy.get('.active > .dropdown-menu > li > .nav-link').click()
    cy.get('.card-header-action > .btn-icon').click()
    cy.get('#name').type('Safira')
    cy.get('#email').type('safiraistifarini@gmail.com')
    cy.get('#password').type('password')
    cy.get('.btn-primary').click()
    cy.get(':nth-child(4) > .text-right > .d-flex > .btn-info').click()
    cy.get('#name').type(" istifarini")
    cy.get('.btn-primary').click()
    cy.get(':nth-child(4) > .text-right > .d-flex > .ml-2 > .btn').click()
    //logout
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click()
    cy.get('.text-danger').click()
  })
})
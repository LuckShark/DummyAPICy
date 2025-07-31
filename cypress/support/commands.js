Cypress.Commands.add('login', (username, password) => {
  return cy.request({
    method: 'POST',
    url: '/auth/login',
    body: { username, password },
  }).then((response) => {
    Cypress.env('accessToken', response.body.accessToken);
    Cypress.env('refreshToken', response.body.refreshToken);
  });
});
describe('API DummyJSON - Testes Automatizados', () => {


  beforeEach(function () {
    cy.fixture('users').then((users) => {
      this.users = users;
    });
  });

  it('CT01 - Login com credenciais válidas', function () {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: this.users.valid,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('accessToken');
    });
  });

  it('CT02 - Login com senha incorreta', function () {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      failOnStatusCode: false,
      body: this.users.invalidPassword,
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('CT03 - Login com campos vazios', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      failOnStatusCode: false,
      body: {},
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422]);
    });
  });
  
  it('CT05 - Obter usuário sem token', () => {
    cy.request({
      method: 'GET',
      url: '/auth/me',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
    });
  });
  
  it('CT06 - Obter usuário com token inválido', () => {
    cy.request({
      method: 'GET',
      url: '/auth/me',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer token_invalido_123',
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
    });
  });
  
  it('CT08 - Refresh com token inválido', () => {
    cy.request({
      method: 'POST',
      url: '/auth/refresh',
      failOnStatusCode: false,
      body: {
        refreshToken: 'um_refresh_token_falso',
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
    });
  });
  
  it('CT09 - Listar usuários (público)', () => {
    cy.request('/users').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.users).to.be.an('array');
    });
  });


  describe('Endpoints Protegidos', () => {
    beforeEach(function () {
      cy.login(this.users.valid.username, this.users.valid.password);
    });

    it('CT04 - Obter usuário autenticado com token válido', () => {
      cy.request({
        method: 'GET',
        url: '/auth/me',
        headers: {
          Authorization: `Bearer ${Cypress.env('accessToken')}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('firstName');
      });
    });

    it('CT07 - Refresh token válido', () => {
      cy.request({
        method: 'POST',
        url: '/auth/refresh',
        body: {
          refreshToken: Cypress.env('refreshToken'),
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('accessToken');
      });
    });
  });
});
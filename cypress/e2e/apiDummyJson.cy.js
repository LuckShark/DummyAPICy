describe('API DummyJSON - Testes Automatizados', () => {
  const baseUrl = 'https://dummyjson.com';
  let accessToken = '';
  let refreshToken = '';

   before(() => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        username: 'emilys',
        password: 'emilyspass'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
      accessToken = res.body.accessToken;
      refreshToken = res.body.refreshToken;
    });
  });

  it('CT01 - Login com credenciais válidas', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        username: 'emilys',
        password: 'emilyspass'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
    });
  });

  it('CT02 - Login com senha incorreta', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      failOnStatusCode: false,
      body: {
        username: 'kminchelle',
        password: 'senhaIncorreta'
      }
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('CT03 - Login com campos vazios', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      failOnStatusCode: false,
      body: {}
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422]);
    });
  });

  it('CT04 - Obter usuário autenticado com token válido', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/auth/me`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('firstName');
    });
  });

  it('CT05 - Obter usuário sem token', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/auth/me`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
    });
  });

  it('CT06 - Obter usuário com token inválido', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/auth/me`,
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer token_invalido'
      }
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
    });
  });

  it('CT07 - Refresh token válido', () => {
    expect(refreshToken, 'O refreshToken não pode estar vazio').to.not.be.empty;
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/refresh`,
      body: {
      refreshToken: refreshToken
        },
    failOnStatusCode: false 
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
    });
  });

  it('CT08 - Refresh com token inválido', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/refresh`,
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer token_falso'
      }
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
    });
  });

  it('CT09 - Listar usuários (público)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users`
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('users');
    });
  });
});

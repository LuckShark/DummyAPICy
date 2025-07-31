# Casos de Teste - API DummyJSON

Este documento apresenta os casos de teste elaborados para a API DummyJSON. O objetivo é validar os fluxos de autenticação, utilização de tokens e acesso a recursos protegidos, conforme comportamento esperado de uma API RESTful.

---

## 1. Autenticação

### CT01 – Login com credenciais válidas
**Objetivo**: Verificar se o login com credenciais válidas retorna os tokens de autenticação.  
**Pré-condição**: Usuário previamente cadastrado.  
**Procedimento**:  
- Enviar uma requisição `POST /auth/login` com `username` e `password` válidos no corpo.  
**Resultado Esperado**: Status `200 OK` com `accessToken`, `refreshToken` e informações do usuário.

---

### CT02 – Login com senha incorreta  
**Objetivo**: Validar o comportamento da API ao receber senha incorreta.  
**Pré-condição**: Usuário existente.  
**Procedimento**:  
- Enviar `POST /auth/login` com `username` válido e senha inválida.  
**Resultado Esperado**: Status `400 Bad Request` com mensagem de erro indicando credenciais inválidas.

---

### CT03 – Login com campos ausentes ou vazios  
**Objetivo**: Validar a obrigatoriedade dos campos `username` e `password`.  
**Procedimento**:  
- Enviar `POST /auth/login` com campos ausentes ou em branco.  
**Resultado Esperado**: Erro de validação (`400` ou `422`) indicando os campos obrigatórios.

---

## 2. Endpoints Protegidos

### CT04 – Obter usuário autenticado com token válido  
**Objetivo**: Confirmar o retorno correto dos dados do usuário autenticado.  
**Pré-condição**: Autenticação realizada e `accessToken` válido disponível.  
**Procedimento**:  
- Enviar `GET /auth/me` com o token no header `Authorization: Bearer {accessToken}`.  
**Resultado Esperado**: Status `200 OK` com dados completos do usuário.

---

### CT05 – Obter usuário sem token  
**Objetivo**: Verificar o comportamento ao omitir o token de autenticação.  
**Procedimento**:  
- Enviar `GET /auth/me` sem incluir o header `Authorization`.  
**Resultado Esperado**: Status `401 Unauthorized` ou `403 Forbidden`.

---

### CT06 – Obter usuário com token inválido  
**Objetivo**: Verificar o tratamento de tokens inválidos ou expirados.  
**Procedimento**:  
- Enviar `GET /auth/me` com um token inválido no header.  
**Resultado Esperado**: Status `401` ou `403`, sem retorno de dados.

---

## 3. Atualização de Token

### CT07 – Refresh de token válido  
**Objetivo**: Validar a geração de novo `accessToken` a partir de um `refreshToken` válido.  
**Pré-condição**: Ter em posse um `refreshToken` válido.  
**Procedimento**:  
- Enviar `POST /auth/refresh` com o token no header `Authorization: Bearer {refreshToken}`.  
**Resultado Esperado**: Status `200 OK` com novo `accessToken`.

---

### CT08 – Refresh com token inválido ou ausente  
**Objetivo**: Confirmar a negativa de autenticação quando o token for inválido ou não informado.  
**Procedimento**:  
- Enviar `POST /auth/refresh` com token inválido ou sem header de autenticação.  
**Resultado Esperado**: Status `401 Unauthorized`.

---

## 4. Listagem de Usuários

### CT09 – Listar usuários (público)  
**Objetivo**: Verificar o retorno da listagem pública de usuários.  
**Procedimento**:  
- Enviar `GET /users`.  
**Resultado Esperado**: Status `200 OK` com array de objetos representando os usuários.

---

## Observações

- Os testes foram estruturados com base na abordagem caixa-preta, considerando casos positivos e negativos.
- Os tokens de acesso e refresh gerados durante a autenticação devem ser reutilizados nas chamadas subsequentes.
- As respostas esperadas consideram os padrões convencionais de status HTTP para autenticação e acesso.


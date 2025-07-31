
# Teste Técnico - QA Automatizador Pleno - PGE-CE

Este repositório contém a entrega completa do teste técnico para a vaga de Analista de Testes QA Pleno da Procuradoria Geral do Estado do Ceará (PGE-CE).  

> A API oficial disponibilizada pela PGE estava fora do ar durante a execução do teste. Para não ficar sem entregar, utilizei a API pública [DummyJSON](https://dummyjson.com/) como substituta, mantendo os princípios do desafio original.  
> Toda a estrutura foi mantida como se estivesse consumindo a API real, com testes equivalentes e documentação completa.  

---

## Estrutura do Projeto

```
📁 cypress
│   ├── e2e
│   │   └── api-dummy.cy.js         # Testes automatizados com Cypress
│   ├── fixtures
│   │   └── users.json              # Massa de dados com usuários válidos e inválidos
│   └── support
│       └── commands.js            # Custom command para login
│
📁 postman
│   └── DummyJSON - Testes de API com Token.postman_collection.json
│
📄 Plano de Testes - Lucas QA PGE.docx
📄 Caderno de Testes - Lucas QA PGE.docx
```

## ✅ Itens Entregues

1. Plano de testes
- Documento completo com estratégia, escopo, cronograma, riscos e ferramentas.

2. Caderno de testes
- Casos de testes organizados por funcionalidade (login, cadastro, consulta).

3. Testes no Postman
- Collection com autenticação, cadastro, consulta e scripts de validação. 

4. Testes Automatizados
- Implementados com Cypress, utilizando token JWT e organização por fixtures. 

5. Relatório de Melhorias
- Sugestões
---

## Tecnologias Utilizadas

- **Cypress**: Automação de testes de API (com uso de `.env`, `fixtures` e `commands`).
- **Postman**: Execução manual, scripts de validação e uso de variáveis de ambiente.
- **JavaScript (ES6+)**: Lógica dos testes.
- **Markdown e Word**: Documentação técnica (plano e casos).
- **DummyJSON API**: API alternativa utilizada devido à indisponibilidade da API oficial.

---

## Execução dos Testes Cypress

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute os testes:
   ```bash
   npx cypress run
   ```


---

## Sobre a Autenticação

- A API DummyJSON utiliza JWT.
- O login é feito via `POST /auth/login`, retornando `accessToken` e `refreshToken`.
- Os tokens são armazenados via `Cypress.env()` e reaproveitados em testes protegidos.
- Um `command` customizado (`cy.login()`) foi criado para reutilização do fluxo de login.

---

## Considerações Finais

Mesmo sem acesso à API real da PGE-CE, mantive a estrutura completa exigida no desafio, incluindo:

- Fluxos positivos e negativos.
- Cobertura dos endpoints de login, cadastro e consulta.
- Automatização com boas práticas (sem uso de `cy.wait()`, uso de fixtures, tokens dinâmicos etc).
- Documentação clara e rastreável.

Estou disponível para apresentar as evidências de execução e responder dúvidas sobre qualquer parte da entrega.

---

**Autor:** Lucas Araújo de Almeida  
**Data da entrega:** 31/07/2025

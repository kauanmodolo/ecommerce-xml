# Demo E-commerce – XMLHttpRequest Assíncrono

Exemplo mínimo e funcional de consumo de uma API REST simulada usando XMLHttpRequest, com loading, tratamento de erro e busca com debounce, para ilustrar o que o time implementará na aplicação oficial do e-commerce a partir dos e-mails técnicos enviados.

- Frontend estático em vanilla JS: index.html, styles.css e app.js na pasta frontend.
- API mock com JSON Server (db.json) expondo /products e suporte a filtros via query string.
- Scripts npm para rodar API e servidor estático em paralelo, facilitando testes locais.

## Objetivos de aprendizagem
- Demonstrar o ciclo completo do XMLHttpRequest: criação, open/configuração, envio, tratamento de estados e erros, e parsing de JSON.
- Exibir feedback de UX com skeletons de loading, mensagens de erro e atualização incremental do DOM.
- Simular endpoints REST realistas para desenvolvimento e revisão colaborativa via GitHub.

## Pré-requisitos
- Node.js LTS e npm instalados no ambiente.
- Git para clonagem e colaboração.

## Instalação
```bash
git clone https://github.com/kauanmodolo/ecommerce-xml.git
cd ecommerce-xml
npm install
```


## Execução rápida (dev)
```bash
npm run dev
```
- API mock: http://localhost:3000/products (JSON Server)
- Frontend: http://localhost:8080 (servidor estático)

Rodar separadamente (opcional):
```bash
npm run api     # sobe o JSON Server em :3000
npm run serve   # serve a pasta frontend em :8080
```


## Estrutura do projeto
```
.
├── db.json             # Base de dados da API mock (JSON Server)
├── package.json        # Scripts: api, serve, dev
├── README.md
└── frontend
    ├── index.html      # UI com campo de busca e lista de produtos
    ├── styles.css      # Estilos, skeletons e layout responsivo
    └── app.js          # Lógica XHR, debounce e atualização de DOM
```


## Endpoints da API mock
- GET /products: lista todos os produtos.[3][1]
- GET /products?name_like=<termo>: pesquisa por nome (filtro nativo do JSON Server).
- Obs.: o JSON Server aceita outras queries (ex.: _page, _limit) úteis para paginação simples.

Exemplo de resposta:
```json
[
  { "id": 1, "name": "Smartphone Zeta", "price": 1999.9, "category": "smartphones" }
]
```


## Fluxo assíncrono com XMLHttpRequest (resumo)
- Gatilho: clique no botão “Buscar” ou digitação no campo ativam a consulta com debounce para evitar excesso de requisições.
- Criação e configuração: new XMLHttpRequest(), open("GET", url, true), headers e timeout.
- Envio e estados: send(); onreadystatechange com readyState 4 e verificação de status 2xx; onerror e ontimeout para falhas.
- Parsing e UI: JSON.parse(responseText) quando necessário e atualização do DOM com skeletons e mensagens de erro.

Trecho simplificado:
```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/products?name_like=fone", true);
xhr.setRequestHeader("Accept", "application/json");
xhr.timeout = 8000;
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      renderizarProdutos(data);
    } else {
      exibirMensagemErro("Erro ao carregar dados.");
    }
  }
};
xhr.onerror = () => exibirMensagemErro("Falha de rede.");
xhr.ontimeout = () => exibirMensagemErro("Tempo de requisição excedido.");
xhr.send();
```


## Como validar localmente
- Acessar http://localhost:8080, digitar no campo de busca e observar chamadas para /products?name_like=..., com skeletons durante carregamento.
- Desligar a API (Ctrl+C no terminal da API) e repetir a busca para ver o tratamento de erro e mensagens adequadas.
- Ajustar db.json para testar categorias, preços e listar latência ao aumentar artificialmente o dataset.
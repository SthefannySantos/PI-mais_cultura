# PI-Mais_cultura

Este repositório contém o código para o **Projeto Integrador** da **UNIVESP**, desenvolvido como parte do curso de **Bacharelado em Tecnologia da Informação**. A aplicação é voltada para a **promoção e divulgação de eventos culturais**, com funcionalidades de cadastro de usuários, inscrição em eventos e a possibilidade de gerenciar a aprovação de eventos.

## 💡 Descrição do Projeto

A aplicação tem como objetivo criar uma plataforma web onde usuários autenticados possam se inscrever em eventos culturais. Além disso, a plataforma permitirá o acompanhamento de eventos concluídos e histórico de inscrições.

### Funcionalidades Principais

- **Cadastro e autenticação de usuários**: Usuários podem se cadastrar e fazer login para se inscrever em eventos.
- **Criação e edição de eventos**: Autores podem criar eventos e aprová-los para visualização dos usuários.
- **Inscrição em eventos**: Usuários podem se inscrever e visualizar os eventos em que estão registrados.
- **Gestão de eventos concluídos**: Eventos concluídos serão marcados e terão seu status atualizado.

## 🚀 Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework web para construção da API.
- **MySQL2**: Banco de dados relacional para armazenar informações.
- **Bcrypt**: Biblioteca para criptografar senhas de forma segura.
- **Dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.

## 📥 Como Rodar o Projeto Localmente

### 1. Clone o Repositório

Primeiro, faça o clone do repositório na sua máquina local:

```bash
git clone https://github.com/SthefannySantos/PI-mais_cultura.git
cd PI-Mais_cultura
```

### 2. Instale as Dependências
Dentro da pasta do projeto, execute o comando abaixo para instalar as dependências:

```bash
cd backend
npm install

cd ../fronted
npm install
```
---

## API Pública

Além das funcionalidades da plataforma, o projeto também disponibiliza uma **API pública de consulta**, desenvolvida em **Node.js** com **Express**, responsável por fornecer dados públicos da plataforma em formato **JSON**.

Essa API foi criada para permitir a comunicação entre aplicações cliente e o back-end do sistema, possibilitando consultas dinâmicas às informações armazenadas no banco de dados. Sua estrutura foi pensada para facilitar o consumo por outras aplicações, como páginas externas, sistemas web e testes via ferramentas como Postman.

A API disponibiliza apenas operações de **consulta**, utilizando o método **GET** para acesso aos dados por meio de rotas públicas.

---

## Objetivo da API

A API do +Cultura tem como objetivo disponibilizar dados públicos da plataforma de forma padronizada, permitindo que outras aplicações possam consultar informações sobre:

* eventos culturais
* artistas cadastrados
* cidades disponíveis
* categorias de eventos

---

## Base URL

```txt
https://maisecultura.com.br/public
```

---

## Endpoints da API

### 1. Listar cidades

**Rota:** `GET /cidades`

Retorna a lista de cidades cadastradas na tabela de eventos. Os nomes das cidades são retornados sem repetição e formatados com a primeira letra de cada palavra em maiúsculo.

**Exemplo de resposta:**

```json
[
  "Limeira",
  "Campinas",
  "Piracicaba"
]
```

**Códigos de resposta:**

* `200 OK` → cidades retornadas com sucesso
* `204 No Content` → não há cidades cadastradas
* `500 Internal Server Error` → erro ao acessar os dados

---

### 2. Listar categorias

**Rota:** `GET /categorias`

Retorna as categorias disponíveis na plataforma.

**Exemplo de resposta:**

```json
[
  "teatro",
  "musica",
  "danca",
  "cinema",
  "literatura"
]
```

**Códigos de resposta:**

* `200 OK` → categorias retornadas com sucesso
* `500 Internal Server Error` → erro interno

---

### 3. Listar eventos

**Rota:** `GET /eventos`

Retorna os eventos cadastrados no sistema.

**Parâmetros de consulta:**

* `cidade`
* `categoria`
* `titulo`
* `artista`
* `concluido`

**Exemplo de requisição:**

```http
GET /eventos?cidade=Limeira&categoria=musica
```

**Exemplo de resposta:**

```json
[
  {
    "id": 1,
    "titulo": "Festival de Música",
    "descricao": "Evento cultural com apresentações musicais",
    "local_evento": "Teatro Municipal",
    "cidade": "Limeira",
    "estado": "SP",
    "categoria": "musica",
    "organizador_evento": "Banda Exemplo",
    "dt_evento": "2025-11-20",
    "fim_inscricao": "2025-11-10",
    "limite_participantes": 100,
    "total_inscritos": 50,
    "capa_evento": "imagem.jpg",
    "map_link": "https://maps.google.com/...",
    "valor": 20.0
  }
]
```

**Códigos de resposta:**

* `200 OK` → eventos retornados com sucesso
* `500 Internal Server Error` → erro ao buscar eventos

---

### 4. Buscar evento por ID

**Rota:** `GET /eventos/:id`

Retorna os dados de um evento específico a partir do identificador.

**Códigos de resposta:**

* `200 OK`
* `400 Bad Request`
* `404 Not Found`
* `500 Internal Server Error`

---

### 5. Listar artistas

**Rota:** `GET /artistas`

Retorna os artistas cadastrados no sistema, com possibilidade de filtro por nome e área de atuação.

**Parâmetros de consulta:**

* `nome`
* `atuacao`

---

### 6. Buscar artista por ID

**Rota:** `GET /artistas/:id`

Retorna os dados de um artista específico a partir do identificador.

**Códigos de resposta:**

* `200 OK`
* `400 Bad Request`
* `404 Not Found`
* `500 Internal Server Error`

---

## Tratamento de Erros

A API possui tratamento básico de erros para garantir respostas adequadas em situações inesperadas.

Os principais retornos utilizados são:

* `200` → requisição realizada com sucesso
* `204` → requisição válida, porém sem conteúdo para retornar
* `400` → parâmetro inválido
* `404` → recurso não encontrado
* `500` → erro interno do servidor

---

## Exemplo de Consumo da API

```javascript
fetch('https://maisecultura.com.br/public/eventos?cidade=Limeira&categoria=musica')
  .then(response => response.json())
  .then(data => {
    console.log('Eventos encontrados:', data);
  })
  .catch(error => {
    console.error('Erro ao consultar a API:', error);
  });
```

---

## Considerações Finais

A API foi estruturada exclusivamente para **consulta de dados públicos**, sem expor informações sensíveis dos usuários.

Além disso, foram incluídos filtros dinâmicos em algumas rotas, permitindo consultas mais flexíveis e facilitando o uso por outras aplicações que desejem consumir os dados da plataforma.

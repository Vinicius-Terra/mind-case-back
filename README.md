## Descrição

O objetivo principal do site é permitir que professores criem contas e possam criar e gerenciar diversos cursos de maneira simples, além de permitir que não cadastrados visualizem os cursos.

## Construído com

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Features

- **Registrar** - É possível se cadastrar;
- **Entrar** - É possível fazer login;
- **Visualizar** - Todos podem visualizar os cursos;
- **Criar** - Como membro cadastrado, é possível criar um curso;
- **Editar** - Como membro cadastrado, é possível editar um curso;
- **Excluir** - Como membro cadastrado, é possível excluir um curso;


## Testing the API

### Endpoints (Thunder Client)

1. Import a coleção do Thunder Client que está no repositorio
3. Vá para a collection mind-case e voce tera os end-points da API!


## API Reference


### AUTHENTICATION

#### Sign Up

```http
POST /sign-up
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |
| `confirmPassword`| `string` | **Required**, must be equal to `password` |

```json
{
  "email": "example@gmail.com",
  "password": "pass1234",
  "confirmPassword": "pass1234"
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `409`    | **Conflict**, user is already registered |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### Sign In

```http
POST /sign-in
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |

```json
{
  "email": "example@gmail.com",
  "password": "pass1234",
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**, returns a token          |
| `json`           |   `401`    | **Unauthorized**, Invalid credentials |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

```json
{
  "token": "JWT token"
}
```

### Courses

- Algumas rotas /courses exigem **Bearer TOKEN**;
- O Token deve ser enviado em Authorization header;
- Se a authenticação falhar a API vai enviar um erro como:

| Code             | Description  |
| :--------------- | :----------- |
| `401`            | **Unauthorized**, invalid token     |
| `400`            | **Bad Request**, token was not sent     |
| `422`            | **Unprocessable Entity**, token is not in the Bearer format     |

#### Post(create) Course

```http
POST /courses
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**        |
| `categoryName`         | `string` | **Required**,  |
| `professorName`     | `string` | **Required**,  |
| `image`| `string` | **Required**, Deve ser uri valido|
| `description`| `string` | **Required**, |

```json
{
  "name": "Calculo 1",
  "categoryName": "Matematica",
  "professorName": "João Mesa",
  "image": "https://img.freepik.com/fotos-gratis/quadro-negro-inscrito-com-formulas-e-calculos-cientificos_1150-19413.jpg?q=10&h=200",
  "description": "Derivadas e Integrais"
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `404`    | **Not Found**, categoria ou Disciplina não encontradas |
| `json`           |   `409`    | **Conflict**, Test already registered |
| `json`           |   `422`    | **Unprocessable Entity**, body é invalido |

#### Get All Courses

```http
GET /courses
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :---------------------------------  |
| `json`           |   `200`    | **OK**                              |

```json
[
  {
    "id": 6,
    "name": "Matematica 1",
    "description": "Curso de matematica 1",
    "image": "https://www.unifor.br/documents/20143/573160/foto-evento-iv-maratona-de-calculo-cct-unifor-800-getty-images.jpg/8cc80504-d5b1-5041-bed2-9f8cf2e7ba21?t=1636466788649",
    "categoryId": 9,
    "professorId": 7,
    "createdAt": "2023-08-25T09:57:38.294Z",
    "updatedAt": "2023-08-25T09:57:38.295Z",
    "professor": {
      "id": 7,
      "name": "João Mesa",
      "createdAt": "2023-08-25T09:57:38.280Z",
      "updatedAt": "2023-08-25T09:57:38.280Z"
    },
    "category": {
      "id": 9,
      "name": "Matematica",
      "createdAt": "2023-08-25T09:57:38.269Z",
      "updatedAt": "2023-08-25T09:57:38.270Z"
    }
  },
  {
    "id": 7,
    "name": "Biologia 1",
    "description": "Curso de biologia 1",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNTh8XjKiXsvsdn3VrIYW81F6KW_lIu74Pfg&usqp=CAU",
    "categoryId": 10,
    "professorId": 8,
    "createdAt": "2023-08-25T09:57:38.301Z",
    "updatedAt": "2023-08-25T09:57:38.302Z",
    "professor": {
      "id": 8,
      "name": "Maria Clara",
      "createdAt": "2023-08-25T09:57:38.285Z",
      "updatedAt": "2023-08-25T09:57:38.285Z"
    },
    "category": {
      "id": 10,
      "name": "Biologia",
      "createdAt": "2023-08-25T09:57:38.276Z",
      "updatedAt": "2023-08-25T09:57:38.277Z"
    }
  }
]
```

#### Get by Name

```http
GET /courses/:name
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**          |
| `json`           |   `404`    | **Course not found**          |

```json
{
  "id": 7,
  "name": "Biologia 1",
  "description": "Curso de biologia 1",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNTh8XjKiXsvsdn3VrIYW81F6KW_lIu74Pfg&usqp=CAU",
  "categoryId": 10,
  "professorId": 8,
  "createdAt": "2023-08-25T09:57:38.301Z",
  "updatedAt": "2023-08-25T09:57:38.302Z",
  "professor": {
    "id": 8,
    "name": "Maria Clara",
    "createdAt": "2023-08-25T09:57:38.285Z",
    "updatedAt": "2023-08-25T09:57:38.285Z"
  },
  "category": {
    "id": 10,
    "name": "Biologia",
    "createdAt": "2023-08-25T09:57:38.276Z",
    "updatedAt": "2023-08-25T09:57:38.277Z"
  }
}
```

#### Delete Course

```http
Delete /courses/:id
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `200`    | **Ok**          |
| `json`           |   `404`    | **Not Found**, categoria ou Disciplina não encontradas |


#### Update Course

```http
Update /courses/:id
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**        |
| `categoryName`         | `string` | **Required**,  |
| `professorName`     | `string` | **Required**,  |
| `image`| `string` | **Required**, Deve ser uri valido|
| `description`| `string` | **Required**, |

```json
{
  "name": "Calculo 1",
  "categoryName": "Matematica",
  "professorName": "João Mesa",
  "image": "https://img.freepik.com/fotos-gratis/quadro-negro-inscrito-com-formulas-e-calculos-cientificos_1150-19413.jpg?q=10&h=200",
  "description": "Derivadas e Integrais"
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `200`    | **OK**          |
| `json`           |   `404`    | **Not Found**, categoria ou Disciplina não encontradas |
| `json`           |   `409`    | **Conflict**, Test already registered |
| `json`           |   `422`    | **Unprocessable Entity**, body é invalido |


### Get All Professors 

```http
Update /professors
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `200`    | **OK**          |

```json
[
  {
    "id": 7,
    "name": "João Mesa",
    "createdAt": "2023-08-25T09:57:38.280Z",
    "updatedAt": "2023-08-25T09:57:38.280Z"
  },
  {
    "id": 8,
    "name": "Maria Clara",
    "createdAt": "2023-08-25T09:57:38.285Z",
    "updatedAt": "2023-08-25T09:57:38.285Z"
  }
]
```


### Get All Categories 

```http
Update /categories
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**          |

```json
[
  {
    "id": 9,
    "name": "Matematica",
    "createdAt": "2023-08-25T09:57:38.269Z",
    "updatedAt": "2023-08-25T09:57:38.270Z"
  },
  {
    "id": 10,
    "name": "Biologia",
    "createdAt": "2023-08-25T09:57:38.276Z",
    "updatedAt": "2023-08-25T09:57:38.277Z"
  }
]
```




## Rodando o Projeto

1. Clone the repository:

    ```bash
    git clone https://github.com/Vinicius-Terra/mind-case-back.git
    ```

2. Navigate to the project directory:

    ```bash
    cd mind-case-back/
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set your environment variables following the .env.sample file:

    | Name              | Type     |
    | :--------------- | :------- |
    | `DATABASE_URL`   | `string` |
    | `PORT`           | `number` |
    | `JWT_SECRET`     | `number` |


5. Run the Build command:

   ```bash
   npn run build
   ```
   

6. Run the project on dev mode:

    ```bash
    npm run dev
    ```




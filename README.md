\# Biblioteca API



API REST para gerenciamento de autores e obras de uma biblioteca. O projeto permite cadastrar, consultar, atualizar e excluir autores e obras, mantendo o relacionamento entre as entidades.



\## Integrantes

Marcio Gustavo Ananias da Silva 







\## Tecnologias utilizadas



\- Node.js

\- TypeScript

\- Express

\- Supabase

\- PostgreSQL

\- Git

\- Postman



\## Entidades e relacionamento



\### Autor



| Campo | Tipo | Descrição |

|---|---|---|

| id | UUID | Identificador único do autor |

| nome | Texto | Nome do autor |

| nacionalidade | Texto | Nacionalidade do autor |

| criado\_em | Data/hora | Data de criação do registro |



\### Obra



| Campo | Tipo | Descrição |

|---|---|---|

| id | UUID | Identificador único da obra |

| titulo | Texto | Título da obra |

| ano\_publicacao | Número | Ano de publicação |

| autor\_id | UUID | Identificador do autor responsável pela obra |

| criado\_em | Data/hora | Data de criação do registro |



Uma entidade \*\*Autor\*\* pode possuir várias \*\*Obras\*\*. Cada \*\*Obra\*\* pertence a um único \*\*Autor\*\*, por meio do campo `autor\_id`, que é uma chave estrangeira para `autores.id`.



\## Estrutura do projeto



```text

biblioteca-api/

├── database/

│   └── schema.sql

├── src/

│   ├── config/

│   │   └── supabase.ts

│   ├── controllers/

│   │   ├── autorController.ts

│   │   └── obraController.ts

│   ├── models/

│   │   ├── autorModel.ts

│   │   └── obraModel.ts

│   ├── routes/

│   │   ├── autorRoutes.ts

│   │   └── obraRoutes.ts

│   ├── app.ts

│   └── server.ts

├── .env.example

├── .gitignore

├── package.json

└── README.md

```



\- `config`: configuração da conexão com o Supabase.

\- `models`: comunicação com as tabelas do banco de dados.

\- `controllers`: regras de validação, tratamento de erros e respostas HTTP.

\- `routes`: definição dos endpoints da API.

\- `app.ts`: configuração do Express e registro das rotas.

\- `server.ts`: inicialização do servidor.



\## Configuração e execução



Clone o repositório:



```bash

git clone URL\_DO\_REPOSITORIO

cd biblioteca-api

```



Instale as dependências:



```bash

npm install

```



Crie o arquivo `.env` usando `.env.example` como modelo:



```env

PORT=3001

SUPABASE\_URL=https://seu-projeto.supabase.co

SUPABASE\_PUBLISHABLE\_KEY=sua\_chave\_publica\_do\_supabase

```



Execute o script `database/schema.sql` no SQL Editor do Supabase para criar as tabelas e políticas de acesso.



Inicie a aplicação:



```bash

npm run dev

```



A API ficará disponível em:



```text

http://localhost:3001

```



\## Variáveis de ambiente



| Variável | Descrição |

|---|---|

| PORT | Porta utilizada pela API |

| SUPABASE\_URL | URL do projeto Supabase |

| SUPABASE\_PUBLISHABLE\_KEY | Chave pública do projeto Supabase |



O arquivo `.env` contém informações de configuração e não deve ser enviado ao repositório. Por isso, ele está listado no `.gitignore`.



\## Banco de dados



O arquivo `database/schema.sql` contém o script de criação das tabelas `autores` e `obras`.



A tabela `obras` possui a chave estrangeira:



```sql

autor\_id uuid not null references public.autores(id) on delete restrict

```



A regra `on delete restrict` impede a exclusão de um autor que ainda possui obras cadastradas. Isso protege a integridade dos dados.



\## Endpoints



\### Autores



| Método | Endpoint | Descrição |

|---|---|---|

| GET | `/autores` | Lista todos os autores |

| GET | `/autores/:id` | Busca um autor pelo UUID |

| POST | `/autores` | Cadastra um autor |

| PUT | `/autores/:id` | Atualiza um autor |

| DELETE | `/autores/:id` | Exclui um autor sem obras vinculadas |



\### Obras



| Método | Endpoint | Descrição |

|---|---|---|

| GET | `/obras` | Lista todas as obras com seus autores |

| GET | `/obras/:id` | Busca uma obra pelo UUID |

| POST | `/obras` | Cadastra uma obra vinculada a um autor |

| PUT | `/obras/:id` | Atualiza uma obra |

| DELETE | `/obras/:id` | Exclui uma obra |



\## Exemplos de requisições



\### Criar autor



\*\*POST\*\* `/autores`



```json

{

&#x20; "nome": "Machado de Assis",

&#x20; "nacionalidade": "Brasileiro"

}

```



Resposta esperada: `201 Created`.



\### Atualizar autor



\*\*PUT\*\* `/autores/:id`



```json

{

&#x20; "nome": "Machado de Assis",

&#x20; "nacionalidade": "Brasileiro"

}

```



Resposta esperada: `200 OK`.



\### Criar obra



\*\*POST\*\* `/obras`



```json

{

&#x20; "titulo": "Dom Casmurro",

&#x20; "ano\_publicacao": 1899,

&#x20; "autor\_id": "UUID\_DO\_AUTOR"

}

```



Resposta esperada: `201 Created`.



\### Atualizar obra



\*\*PUT\*\* `/obras/:id`



```json

{

&#x20; "titulo": "Dom Casmurro - Edição Atualizada",

&#x20; "ano\_publicacao": 1899,

&#x20; "autor\_id": "UUID\_DO\_AUTOR"

}

```



Resposta esperada: `200 OK`.



\## Validações e tratamento de erros



A API valida os dados enviados antes de gravá-los no banco.



\- O nome do autor deve possuir ao menos 3 caracteres.

\- O título da obra deve possuir ao menos 2 caracteres.

\- O campo `autor\_id` deve ser um UUID válido.

\- O ano de publicação, quando informado, deve ser um número inteiro válido.

\- Registros não encontrados retornam `404 Not Found`.

\- Dados inválidos retornam `400 Bad Request`.

\- Falhas internas retornam `500 Internal Server Error`.

\- A tentativa de excluir um autor com obras vinculadas retorna `409 Conflict`.

\- Operações de exclusão bem-sucedidas retornam `204 No Content`.



\## Testes



Os endpoints foram testados com o Postman, utilizando uma coleção chamada `Biblioteca API - APS`.



\## Versionamento



O projeto é versionado com Git. Antes de enviar alterações, execute:



```bash

git status

git add .

git commit -m "feat: implementa API de biblioteca"

```


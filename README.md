# Teacher Notes Hub — Frontend

Aplicação frontend do **Teacher Notes Hub**, um sistema de apoio à organização de registros escolares. A interface foi desenvolvida em Angular e consome a API do projeto para disponibilizar funcionalidades de gestão acadêmica a professores e usuários administrativos.

O sistema reúne recursos para organizar cadernetas, alunos, aulas, frequência, notas, atividades e informações de desempenho. A interface também possui páginas específicas para consulta e administração de instituições, professores e usuários.

## ✨ Funcionalidades da interface

- Autenticação e navegação entre as áreas do sistema.
- Consulta e gerenciamento de cadernetas escolares.
- Organização de alunos e informações de turmas.
- Registro e consulta de aulas e frequência.
- Gestão de notas e atividades.
- Consulta de desempenho dos estudantes.
- Páginas administrativas e componentes reutilizáveis para formulários, diálogos, listas e confirmações.
- Telas e estilos específicos para diferentes tamanhos de tela.

> Este repositório contém somente a aplicação frontend. A lógica de negócio e a persistência de dados são fornecidas pela [API do Teacher Notes Hub](https://github.com/C410lol/teacher-notes-hub-api).

## 🧰 Tecnologias

- **Angular 16**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **Angular Forms**
- **HTML e CSS**
- **@ng-select/ng-select**

## 🗂️ Organização do projeto

A aplicação segue a estrutura padrão de um projeto Angular, organizada principalmente em:

- `src/app/pages`: páginas e fluxos de navegação, como login, área inicial, cadernetas, alunos, professores, aulas e áreas administrativas.
- `src/app/components`: componentes reutilizáveis, diálogos, elementos de lista e componentes de interface.
- `src/app/services`: serviços responsáveis pela comunicação HTTP com a API.
- `src/app/types`: tipos e interfaces usados para representar os dados recebidos e enviados pela aplicação.
- `src/environments`: configurações de ambiente, incluindo os endereços utilizados para comunicação com a API.

## ▶️ Como executar localmente

### Pré-requisitos

- Node.js e npm.
- A [API do Teacher Notes Hub](https://github.com/C410lol/teacher-notes-hub-api) configurada e em execução.
- Acesso a uma instância da API a partir do endereço definido nos arquivos de ambiente.

### Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/C410lol/teacher-notes-hub-front.git
cd teacher-notes-hub-front
npm install
```

### Ambiente de desenvolvimento

```bash
npm start
```

O servidor de desenvolvimento do Angular ficará disponível, normalmente, em `http://localhost:4200/`.

Antes de utilizar a aplicação, confira os arquivos em `src/environments/` e ajuste as URLs para apontar para a instância correta da API.

### Build de produção

```bash
npm run build
```

Os arquivos compilados serão gerados no diretório de saída configurado pelo Angular CLI.

### Testes

```bash
npm test
```

## 🔗 Projeto relacionado

- [Teacher Notes Hub — API](https://github.com/C410lol/teacher-notes-hub-api)

---

Projeto desenvolvido como parte de uma iniciativa de desenvolvimento de software para organização de informações e rotinas escolares.

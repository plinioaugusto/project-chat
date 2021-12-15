## _Projeto do Curso NodeJS com Typescript_

Repositório contendo o código final do curso ministrado por Andrew Rosário, onde foi desenvolvida uma aplicação de chat em tempo real, composta pelas seguintes tecnologias:

- MongoDB - Banco de Dados orientado a Documentos
- Express - Framework de desenvolvimento web para Node
- Node - Ambiente de Execução Back-End

## Rotas definidas:

- _Cadastrar usuário - cadastra nome e senha do usuário, disparando um hook para encriptografar senha._
- _Autenticar usuário - autentica usuário com base no login e senha, retornando um token para ser usado nas requisições._
- _Enviar mensagens - dispara mensagem entre o usuário logado e um usuário específico._
- _Listar mensagens - lista todas as mensagens entre o usuário autenticado e um usuário específico._
- _Buscar usuários - traz os dados de um usuário, sendo necessário passar o token de autorização._
- _Listar usuários - Retornando sempre a lista de usuários em ordem decrescente tendo como parâmetro a data da última mensagem enviada (mensagens recentes primeito, semelhante ao whastapp)._

## Recursos utilizados com NodeJs:

- _Realizar a integração com o banco de dados MongoDB_
- _Criar rotas, controllers, models, middlewares com o auxílio do Express_
- _Implementando contratos com interfaces_
- _Realizar autenticação de usuário com JWT_
- _Criação de hooks para modelo de usuários_
- _Declaração de tipagens globais_
- _Criação de métodos personalizados_
- _Utilização de optional chaining_

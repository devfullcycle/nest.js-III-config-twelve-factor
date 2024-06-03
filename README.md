# 3º princípio do Twelve Factor (Config) no Nest.js

Muita gente acha que o 3º princípio do Twelve Factor é apenas sobre variáveis de ambiente, mas ele vai muito além disso.

Ele fala sobre como você deve tratar as configurações da sua aplicação, como você deve separar as configurações de ambiente, como você deve tratar as configurações de banco de dados, de cache, de fila, de autenticação, de autorização, de logs, de métricas, de tudo que você possa imaginar.

O Nest.js tem um módulo chamado ConfigModule que facilita muito a aplicação deste princípio, mas na documentação oficial não é ensinado como aplicar este princípio de forma avançada, de modo que você possa ter uma aplicação totalmente configurável e escalável.

Neste vídeo eu mostro como você pode aplicar o 3º princípio do Twelve Factor no Nest.js de forma avançada, utilizando o ConfigModule e o pacote dotenv. []()

Este repositório aplica os conceitos de Nest.js usando no curso Full Cycle 3.0.

Veja a aula no Youtube: [https://www.youtube.com/watch?v=j7ivOwbhQG8](https://www.youtube.com/watch?v=j7ivOwbhQG8)

## Branches

- `main`: código final do vídeo
- `01-sem-config-module`: Exemplo de aplicação sem o ConfigModule
- `02-config-module-simples`: Exemplo de aplicação com o ConfigModule
- `03-config-module-e-validacao`: Exemplo de aplicação com o ConfigModule e validação
- `04-config-module-multiple-envs`: Exemplo de aplicação com o ConfigModule e múltiplos ambientes
- `05-definitive-config-module`: Exemplo de aplicação com o ConfigModule definitivo (igual ao main)


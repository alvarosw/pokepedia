# pokepedia
Aplicação simples de listagem e amostra de pokemons

Teste agora clicando [aqui](https://pokepedia-eight.vercel.app/) (pode ser que você precise desbloquear o acesso a conteúdo inseguro - HTTP) ou instale e rode localmente seguindo o passo a passo abaixo:

## Clone o repositório
Digite no terminal:
```bash
git clone https://github.com/alvarosw/pokepedia
cd pokepedia
```

## Rodando com o Docker
Para a primeira vez, na raíz do projeto digite: 
```
docker-compose up --build
```

Nas próximas não se faz mais necessária a flag `--build`

## Rodando manualmente
No seu terminal, digite:
``` bash
cd backend
npm i
cd ../frontend
npm i
```

Copie os arquivos `.env.example` de ambas pastas e renomeie para `.env`, alterando como necessário.

Agora deixe duas janelas de terminal abertas: uma no diretório do backend e outra no do frontend.

Caso queira rodar apenas o frontend, basta deixar a variável de ambiente do host da api como no `env.example` do frontend. Se não, no terminal do backend, digite:
``` bash
npm run server
```

E copie o host para a variável de ambiente de host da api no frontend.

Após isso, basta rodar o projeto do frontend com:
``` bash
npm start
```


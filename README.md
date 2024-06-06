# Production-Ready Backend

<img src="https://www.amritaclasses.com/assets/reviews/developers/developer1.jpg" width="300"/>

## Super-Quick Setup

#### After fetching code , remove .git config

```bash
npx rimraf ./.git
```

### with Docker

use docker-compose to run it in production/development mode :

Development Mode :

```bash
npm i
docker-compose -f docker-compose.dev.yaml up --build
```

📝 i am doing `npm i ` because in dev mode, this directory is bind mount with docker container. so if i dont do this `npm i`
then maybe i got some error like `package not found`.

Production Mode :

```bash
docker compose -f docker-compose.prod.yaml up --build
```

### or Native

use npm or any other package manager to download:

for development :

```bash
npm i
npm run dev
```

for production :

```bash
npm i
npm run start
```

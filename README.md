# Quick Start
## Installation
```bash
$ cp local.env .env
```
```bash
$ npm install
```

## Start Server
```bash
$ npm run start:dev
```
### Run migration
```bash
$ npm run typeorm migration:run
```

## Testing
```bash
$ npm test
```

## Route 
``POST /v1/user/auth``
> user auth, param (email, password)

``POST /v1/users/register``
> register new user, params (email, name, password)

``GET /user/pokemon/random``
> get random pokemon

``GET /user/pokemon/{nameOrId}``
> get spesific pokemon by name or id

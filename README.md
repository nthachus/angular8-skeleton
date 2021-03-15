# Angular 8 Tus-client Skeleton

A demonstration for [Sinatra Restful-API Skeleton](https://github.com/nthachus/sinatra-rest-skeleton) using Angular v8.

## Dependencies

- `Node.js` 10+ with `Yarn` 1 (Classic)

## What is inside?

For Framework:

- Angular (v8.2)
- Bootstrap (v4.3)
- NG Bootstrap - Angular powered Bootstrap (v5)
- Font Awesome (v4.7)
- Lodash (v4)

Libraries:

- `hash.js` - Hash functions in pure JavaScript (v1)
- `angular-jwt` - Helper library for handling JWTs in Angular (v3)
- `ngx-translate` - The internationalization (i18n) library for Angular (v12)
- `ngx-uploadx` - Angular Resumable Upload Module (v4)

For Development:

- Angular CLI (v8.3)
- Jasmine - Behavior-Driven JavaScript (v3.4)
- Karma - Spectacular Test Runner for JavaScript (v4.1)
- Protractor - E2E test framework for Angular (v7.0)
- TSLint - An extensible linter for the TypeScript language (v5.15)
- Prettier - Opinionated Code Formatter (v2)

## Features

## Directory structure

```
$
├─ [e2e]
│  ├─ [src]
│  └─ protractor.conf.js
├─ [src]
│  ├─ [app]
│  ├─ [assets]
│  ├─ [environments]
│  └─ _fonts.css
├─ angular.json
├─ karma.conf.js
└─ tsconfig*.json
```

## Development

Install dependencies:

    $ yarn --no-bin-links

Code style checking:

    $ yarn format -c && yarn lint

Build the project for production:

    $ yarn build

Running unit tests:

    $ yarn test

Running end-to-end tests:

    $ yarn e2e

Development server:

    $ yarn start --host=0.0.0.0 --disableHostCheck

Then, navigate http://localhost:4200/ for verifying.

## Development using [Docker](https://www.docker.com)

Build and run Development server:

    $ docker-compose -f ../sinatra-rest-skeleton/docker-compose.yml -f docker-compose.yml up -d web-dev

Run `docker exec -it skeleton-web /bin/sh` for development console.\
**Refer** to [docker-compose.yml](docker-compose.yml) for more details.

Running Production server after the built:

    $ docker-compose -f ../sinatra-rest-skeleton/docker-compose.yml -f docker-compose.yml up -d web-prod

Navigate http://docker.lvh.me/ for verifying (`docker.lvh.me` is the running docker-machine IP).

### Notes

- View the executed SQLs: `docker-compose -f ../sinatra-rest-skeleton/docker-compose.yml -f docker-compose.yml logs db`
- View the API logs: `docker-compose -f ../sinatra-rest-skeleton/docker-compose.yml -f docker-compose.yml logs api-dev`
- Shutdown the Docker containers: `docker-compose -f ../sinatra-rest-skeleton/docker-compose.yml -f docker-compose.yml down`

## License

The skeleton is available as open source under the terms of the [MIT License](LICENSE).

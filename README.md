# Angular 8 Tus-client Skeleton

A demonstration for [Sinatra Restful-API Skeleton](https://github.com/nthachus/sinatra-rest-skeleton) using Angular v8.

## Dependencies

- `Node.js` 10+ with `Yarn` 1 (Classic)

## What is inside?

For Framework:

- Angular (v8.2)
- Bootstrap (v4.3)
- NG Bootstrap (v5) - Angular powered Bootstrap
- Font Awesome (v4.7)
- Lodash (v4)

Libraries:

- `hash.js` (v1) - Hash functions in pure JavaScript
- `angular-jwt` (v3) - Helper library for handling JWTs in Angular
- `ngx-translate` (v12) - The internationalization (i18n) library for Angular
- `ngx-uploadx` (v4) - Angular Resumable Upload Module

For Development:

- Angular CLI (v8.3)
- Jasmine (v3.4) - Behavior-Driven JavaScript
- Karma (v4.1) - Spectacular Test Runner for JavaScript
- Protractor (v7.0) - E2E test framework for Angular
- TSLint (v5.15) - An extensible linter for the TypeScript language
- Prettier (v2) - Opinionated Code Formatter

## Features

- Supported browsers: IE 9+
- Use `AOT` with `Ivy` for faster compilation
- Styling with `Bootstrap` v4.3 and `Font Awesome` v4.7

## Directory structure

```
$
├─ [e2e]
│  ├─ [src]
│  └─ protractor.conf.js
├─ [src]
│  ├─ [app]
│  │  ├─ [shared]
│  │  │  ├─ [components]
│  │  │  ├─ [interceptors]
│  │  │  ├─ [pipes]
│  │  │  ├─ [services]
│  │  │  └─ shared.module.ts
│  │  ├─ [<layout>]
│  │  │  ├─ [services]
│  │  │  ├─ [<component>]
│  │  │  ├─ [<module>]
│  │  │  └─ <layout>.module.ts
│  │  └─ app.module.ts
│  ├─ [assets]
│  │  ├─ [css]
│  │  ├─ [fonts]
│  │  ├─ [i18n]
│  │  └─ [images]
│  ├─ [environments]
│  ├─ _fonts.css
│  ├─ styles.scss
│  ├─ index.html
│  └─ proxy.conf.json
├─ .svgo.yml          - Configuration for SVG optimizing tool
├─ angular.json       - Angular workspace configuration
├─ karma.conf.js      - Test Runner configuration
├─ tsconfig*.json     - TypeScript configurations
└─ tslint.json        - TypeScript linter configuration
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

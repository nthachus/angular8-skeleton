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
- Styling with `Bootstrap` v4.3 and `Font Awesome` v4.7 using `Sass` language
- Use `Google` font `Noto Sans JP` for cross-browsers
- Proxying to the backend API on development mode with `proxy.conf.json` file
- Having multiple layouts for different routes
- Handle API errors with global `toast` service
- Add `Accept-Language` header to APIs automatically
- Support sortable data tables with `sortable-header` component
- Provide `fileSize` pipe to print file sizes in human readable format
- Detect icon class for file types with `fileType` and `mediaType` pipes
- Localization (i18n) with `ngx-translate` v12
- Authentication with `JWT`
- User files management with resumable upload / download features

## Directory structure

```
$
├─ [e2e]                    - End-to-end tests
│  ├─ [src]
│  └─ protractor.conf.js    - Test-tool configuration
├─ [src]
│  ├─ [app]                       - Contains the application logic and data
│  │  ├─ [shared]                 - The shared module that provide global components, services, pipes,...
│  │  │  ├─ [components]          - Contains shared components (e.g. Toasts, SortableTableHeader)
│  │  │  ├─ [interceptors]        - Interceptors to manage HTTP requests
│  │  │  ├─ [pipes]
│  │  │  ├─ [services]            - Shared services, guards,... (e.g Authentication service)
│  │  │  ├─ constants.ts          - Defines app constants (e.g. Route paths)
│  │  │  ├─ logger.ts             - Helper class for console logging
│  │  │  ├─ logger.spec.ts        - Unit test for the Logger class
│  │  │  └─ shared.module.ts
│  │  ├─ [<layout>]                     - Defines a layout module
│  │  │  ├─ [services]                  - The module specific services
│  │  │  ├─ [<component>]               - The module specific components
│  │  │  ├─ [<module>]                  - Defines a layout sub-module (e.g. View page)
│  │  │  ├─ <layout>-routing.module.ts  - Defines routes for the layout
│  │  │  ├─ <layout>.component.ts       - The layout component
│  │  │  └─ <layout>.module.ts
│  │  ├─ app-routing.module.ts    - Defines the app's root routes
│  │  ├─ app.component.ts         - The logic for the app's root component
│  │  ├─ app.component.spec.ts
│  │  └─ app.module.ts            - The root module that used to assemble the application
│  ├─ [assets]            - Contains image and other asset files
│  │  ├─ [css]            - Specific CSS files (e.g. Styles for IE)
│  │  ├─ [fonts]
│  │  ├─ [i18n]           - Contains translation JSON files
│  │  └─ [images]
│  ├─ [environments]      - Contains build configuration options for dev / prod target environments
│  ├─ _fonts.css          - Defines CSS fonts for the app (e.g. Noto Sans JP)
│  ├─ styles.scss         - Global styles for the project
│  ├─ favicon.ico
│  ├─ index.html          - The main HTML page
│  ├─ main.ts             - The main entry point for the application
│  ├─ polyfills.ts        - Provides polyfill scripts for browser support
│  ├─ test.ts             - The main entry point for the unit tests
│  └─ proxy.conf.json     - The backend API proxying configuration for dev server
├─ .editorconfig
├─ .svgo.yml              - Configuration for SVG optimizing tool
├─ angular.json           - Angular workspace configuration
├─ karma.conf.js          - Test Runner configuration
├─ tsconfig*.json         - TypeScript configurations
└─ tslint.json            - TypeScript linter configuration
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

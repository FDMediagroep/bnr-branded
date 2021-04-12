[![Build](https://github.com/FDMediagroep/bnr-branded/actions/workflows/build.yml/badge.svg)](https://github.com/FDMediagroep/bnr-branded/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/FDMediagroep/bnr-branded/badge.svg?branch=main)](https://coveralls.io/github/FDMediagroep/bnr-branded?branch=main)
[![CodeQL](https://github.com/FDMediagroep/bnr-branded/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/FDMediagroep/bnr-branded/actions/workflows/codeql-analysis.yml)
[![Docker](https://github.com/FDMediagroep/bnr-branded/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/FDMediagroep/bnr-branded/actions/workflows/docker-publish.yml)

# bnr-branded

Check the [Wiki](https://github.com/FDMediagroep/bnr-branded/wiki) for more documentation.

## Prerequisites

-   NodeJS
-   NPM
-   Vercel

## Getting started

1. Clone this project
1. `npm i`: Install all necessary modules for this project
1. `npm run dev`: Start the local development server
1. Open `localhost:3000` in your browser to use the application.

### VSCode GraphQL plugin from GraphQL Foundation

[GraphQL plugin](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) - For autocomplete, syntax highlighting and inline query execution.

## Docker

There are NPM Scripts for building the Docker Image and running/stopping the Docker Image as Docker Container. Running the image as container requires a few environment variables to be set.

### Environment variables

```
VERCEL_ENV=development
GRAPHQL_SCHEMA_ENDPOINT=<URL>
AUTH0_DOMAIN=<DOMAIN>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=<URL>
AUTH0_CLIENT_SECRET=<SECRET>
AUTH0_CLIENT_ID=<ID>
AUTH0_SECRET=<SECRET>
KEYCLOAK_ISSUER=<KEYCLOAK ISSUER>
KEYCLOAK_CLIENT_ID=<ID>
KEYCLOAK_CLIENT_SECRET=<SECRET>
COGNITO_POOL_ID=<POOL ID>
NEXTAUTH_URL=http://localhost:3000
COGNITO_DOMAIN=<DOMAIN>
COGNITO_CLIENT_SECRET=<SECRET>
COGNITO_CLIENT_ID=<ID>
CLOUDSEARCH_SEARCH_URL=<URL>
SANITY_DATASET=<DATASET NAME>
SANITY_PROJECT_ID=<ID>
OMNY_ORGID=<ID>
SANITY_TOKEN=<TOKEN>
```

The NPM script `docker:run` expects a `.env` file in the root containing these values and it will be used as the Docker Container environment variables.

## More resources

-   [BNR Design System](https://github.com/FDMediagroep/bnr-design-system)
-   [FDMG CSS Grid](https://github.com/FDMediagroep/fdmg-css-grid)

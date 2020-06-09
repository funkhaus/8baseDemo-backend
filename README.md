# 8BaseDemo-backend

This is a basic demo of how to build a basic 8Base powered application using Nuxt as a frontend. This repo covers the 8Base custom functions.

## Custom functions

Basically LAMBDA functions on that run on AWS.

There are 4 types of Custom Functions.
SEE https://docs.8base.com/docs/8base-console/custom-functions/

## Install 8Base CLI

`sudo npm install -g 8base-cli`.

SEE https://docs.8base.com/docs/development-tools/cli/

### Example: Don't allow user to Like a Post twice

1. `8base login`
1. `8base init vue-demo -e`
1. `cd vue-demo`
1. `8base generate resolver likePost -s=js`
   1. `8base generate -h` for all options. You want TypeScript?
1. Install graphql and graphql-tag into package
1. `8base deploy`

The way 8Base knows what functions match what hooks/events, is the `8base.yml` file.

## Running a CF locally with mock data

1. Mock run a function `8base invoke-local likePost -m request`
   1. `request` is the mock data filename, so `/mocks/request.json`.
1. `8base invoke likePost -m request` to run it with production code.

## Environment vars

SEE https://app.8base.com/settings/environment-variables

And then in code: `process.env.{varKey}`

## Export/Import data model

`8base export -h`
`8base import -h`

## Some Auth0 resolvers

1. Auth SDK import: https://github.com/funkhaus/polaris-backend/blob/master/server/src/auth0/index.js
1. Custom forgot password API resolver: https://github.com/funkhaus/polaris-backend/blob/master/server/src/resolvers/userForgotPassword/index.js

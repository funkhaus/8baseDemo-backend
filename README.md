# 8BaseDemo-backend

This is a basic demo of how to build a basic 8Base powered application using Nuxt as a frontend. This repo covers the 8Base custom functions.

Please see the corresponding [frontend codebase here](https://github.com/funkhaus/8baseDemo-backend).

## Custom functions

Basically these are LAMBDA functions that run on AWS.

There are 4 types of Custom Functions.
SEE https://docs.8base.com/docs/8base-console/custom-functions/

1. Resolvers: For extending your GraphQL API with new "endpoints"
1. Webhooks: You can run a custom function via a URL
1. Triggers: For functions requiring event-based execution (like before or after a query/mutation)
1. Tasks: For invocable and scheduled (cron) functions

## Install 8Base CLI

1.  `sudo npm install -g 8base-cli`.
1.  `npm install graphql --save`
1.  `npm install graphql-tag --save`

SEE https://docs.8base.com/docs/development-tools/cli/

### Example: Custom Resolver - Don't allow user to Like a Post twice

1. `8base login`
1. `8base init server -e`
1. `cd server`
1. `8base generate resolver likePost -s=js`
   1. `8base generate -h` for all options. You want TypeScript?
1. Install `graphql` and `graphql-tag` into package
1. Create `/server/src/resolvers/likePost/schema.graphql`
1. Use `8base invoke-local likePost -m request` to see how function runs.
   1. Note that `console.log()` works
   1. `event.data` parameter contains all the GQL variables.
1. `8base deploy`
1. Notice how API Explorer in 8Base dashboard has changed now.

The way 8Base knows what functions match what hooks/events, is the `8base.yml` file.

## Running a CF locally with mock data

1. Mock run a function `8base invoke-local likePost -m request`
   1. `request` is the mock data filename, so `/mocks/request.json`.
1. `8base invoke likePost -m request` to run it with production code.

## Logs

SEE https://app.8base.com/logic/likePost/configuration

8Base logs for a custom function ran through the API. Good for debugging.

## Environment vars

SEE https://app.8base.com/settings/environment-variables

And then in code: `process.env.{varKey}`

## Export/Import data model from 8Base

`8base export -h`
`8base import -h`

## Some Auth0 resolver examples

I included some examples of resolvers to wrap some Auth0 functions for you.

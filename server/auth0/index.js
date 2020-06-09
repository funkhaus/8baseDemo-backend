import { ManagementClient, AuthenticationClient } from "auth0";

const {
  AUTH0_DOMAIN: domain,
  AUTH0_CLIENT_ID: clientId,
  AUTH0_CLIENT_SECRET: clientSecret
} = process.env;

const auth0Management = new ManagementClient({
  domain,
  clientId,
  clientSecret
});

const auth0Authentication = new AuthenticationClient({
  domain,
  clientId
});

export { auth0Management, auth0Authentication };

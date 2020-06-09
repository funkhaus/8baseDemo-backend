import gql from 'graphql-tag';

import { auth0Management } from '../../auth0';

const GET_USER = gql`
  query GetUser {
    user {
      id
      email
    }
  }
`;

const LAST_PASSWORD_UPDATE = gql`
  mutation($id: ID!, $date: DateTime!) {
    userUpdate(data: { id: $id, lastPasswordChange: $date }) {
      id
    }
  }
`;

async function userUpdatePassword(event, ctx) {
  const { password } = event.data;

  const { user: eightBaseUser } = (await ctx.api.gqlRequest(GET_USER)) || {};

  if (!eightBaseUser) {
    const error = new Error(`Couldn't identify a user.`);
    console.error(error);

    return {
      data: {
        success: false,
      },
      errors: [error],
    };
  }

  let user;

  try {
    [user] = await auth0Management.getUsersByEmail(eightBaseUser.email);
  } catch (error) {
    console.error(error);

    return {
      data: {
        success: false,
      },
      errors: [error],
    };
  }

  const id = `${user.identities[0].provider}|${user.identities[0].user_id}`;

  try {
    await auth0Management.updateUser(
      {
        id,
      },
      {
        password,
      },
    );
  } catch (error) {
    console.error(error);

    return {
      data: {
        success: false,
      },
      errors: [error],
    };
  }

  /**
   * Update user lastPasswordChange field.
   */
  try {
    let now = new Date();

    await ctx.api.gqlRequest(
      LAST_PASSWORD_UPDATE,
      {
        id: eightBaseUser.id,
        date: now.toJSON(),
      },
      {
        checkPermissions: false,
      },
    );
  } catch (error) {
    return {
      data: {
        success: false,
      },
      errors: [error],
    };
  }

  return {
    data: {
      success: true,
    },
  };
}

export default userUpdatePassword;

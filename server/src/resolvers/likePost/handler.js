/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    likePost:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local likePost -p src/resolvers/likePost/mocks/request.json
 */

/*
 * Don't let a user like a post twice
 */
import gql from "graphql-tag";

export default async (event, ctx) => {
  const { id } = event.data;

  // Look for a post with ID
  const query = gql```query($id: id) {
      likesList(filter: {
        post: {
          id: {
            equals: $id
          }
        }
        createdBy: {
          is_self: true
        }
      }) {
        count
      }
  }```;

  // Hit API
  const {
    likesList: { count }
  } = await ctx.api.gqlRequest(query, {
    id: id
  });

  // Abort early if user already liked post
  if (count > 0) {
    return {
      data: {
        success: false
      }
    };
  }

  // TODO Do a regualr like mutation now
  // mutation {
  //   likeCreate(data: {
  //     post: {
  //       connect: {
  //         id:
  //       }
  //     }
  //   }) {
  //     id
  //   }
  // }

  return {
    data: {
      success: true
    }
  };
};

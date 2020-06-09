/*
 * Don't let a user like a post twice
 */
import gql from "graphql-tag";

export default async (event, ctx) => {
  const { id } = event.data;

  // Look for a post with ID
  const query = gql`
    query($id: ID!) {
      likesList(
        filter: { post: { id: { equals: $id } }, createdBy: { is_self: true } }
      ) {
        count
      }
    }
  `;

  // Check if Like exists already
  const { likesList } = await ctx.api.gqlRequest(query, {
    id: id
  });

  // Abort early if user already liked post
  if (likesList.count > 0) {
    return {
      data: {
        success: false
      }
    };
  }

  // Mutation to create a like
  const mutation = gql`
    mutation($id: ID!) {
      likeCreate(data: { post: { connect: { id: $id } } }) {
        id
      }
    }
  `;

  // Create a Like via API
  const { likeCreate } = await ctx.api.gqlRequest(mutation, {
    id: id
  });

  return {
    data: {
      success: likeCreate.id ? true : false
    }
  };
};

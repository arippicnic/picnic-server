import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    signUp(email: String!, password: String!): User @guest
    signIn(email: String!, password: String!): User @guest
    signOut: Boolean @auth
  }

  type User {
    id: ID!
    email: String!
    email_confirmed: Boolean
  }
`;

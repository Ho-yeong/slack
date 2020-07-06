import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolver";

const typeDefs = `
    type User {
        _id : ID!
        username : String!
        email : String!
        password : String!
    }

    type Query {
        allUser : [User]
    }

    input UserInput {
        username : String!
        email : String!
        password : String!
    }
    type Mutation {
        createUser(input: UserInput): User
    }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default [typeDefs];

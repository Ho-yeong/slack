export default `
type User {
    _id : ID!
    username : String!
    email : String!
    password : String!
    teams : [Team!]!
}
type Query {
    allUser : [User]
    getUser(_id : ID!) : User
}

input UserInput {
    username : String!
    email : String!
    password : String!
}

type Mutation {
    register(input: UserInput): Boolean!
}
`;

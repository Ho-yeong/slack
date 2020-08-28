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

type RegisterResponse {
    ok : Boolean!
    user : User
    errors : [Error!]
}
input UserInput {
    username : String!
    email : String!
    password : String!
}


type Mutation {
    register(input: UserInput): RegisterResponse!
}
`;

export default `
type Channel {
    _id : ID!
    name : String!
    public : Boolean!
    messages : [Message!]!
    users : [User!]!
    teamId : Team!
}

type Query {
    allChannel : [Channel]
}

type Mutation {
    createChannel(teamId : Int!, name : String!, public : Boolean=false ): Boolean!
}
`;

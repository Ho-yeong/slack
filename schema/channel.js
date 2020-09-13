export default `
type Channel {
    _id : ID!
    name : String!
    public : Boolean!
    messages : [Message!]!
    users : [User!]!
    teamId : Team!
}

type CreateChannelResponse {
    ok : Boolean!
    channel : Channel
    errors : [Error!]
}

type Query {
    allChannel : [Channel]
}

type Mutation {
    createChannel(teamId : String!, name : String!, public : Boolean=false ): CreateChannelResponse!
}
`;

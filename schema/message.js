export default `
type Message {
    _id : ID!
    text : String!
    user : User!
    channel : Channel!
    createdAt : String!
}

type Query {
    messages(channelId : String!) : [Message!]!
}


type Mutation {
    createMessage(channelId : String!, text : String!): Boolean!
}
`;

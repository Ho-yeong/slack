export default `
type Message {
    _id : ID!
    text : String!
    user : User!
    channel : Channel!
}


input MessageInput {
    channelId : Int!
    text : String!
}

type Mutation {
    createMessage(input : MessageInput): Boolean!
}
`;

export default `
    type DirectMessage {
        _id : ID!
        text : String!
        sender : ID!
        receiverId : ID!
    }
    
    type Query {
        directMessage : [DirectMessage!]!
    }
    
    type Mutation {
        createDirectMessage(receiverId : ID!, text : String!) : Boolean!
    }
`;

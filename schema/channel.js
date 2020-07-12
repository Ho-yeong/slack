export default `
type Channel {
    _id : ID!
    name : String!
    public : Boolean!
    messages : [Message!]!
    users : [User!]!
}`;

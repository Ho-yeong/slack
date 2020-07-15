export default `
type Team {
    owner : User!
    members : [User!]
    channels : [Channel!]!
}
input TeamInput {
    name : String!
}
type Mutation {
    createTeam(input : TeamInput): Boolean!
}
`;

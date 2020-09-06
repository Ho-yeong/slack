export default `
type Team {
    owner : User!
    members : [User!]
    channels : [Channel!]!
}
input TeamInput {
    name : String!
}

type CreateTeamResponse {
    ok : Boolean!
    errors : [Error!]
}

type Mutation {
    createTeam(input : TeamInput): CreateTeamResponse!
}
`;

export default `
type Team {
    _id : ID!
    name : String!
    owner : User!
    members : [User!]
    channels : [Channel!]
}

type CreateTeamResponse {
    ok : Boolean!
    team : Team!
    errors : [Error!]
}

type Query {
    allTeams: [Team!]!
}

type VoidResponse {
    ok : Boolean!
    errors : [Error!]
}

type Mutation {
    createTeam(name : String!): CreateTeamResponse!
    addTeamMember(email:String!, teamId : String!) : VoidResponse!
}
`;

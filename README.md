# slack-clone

slack-clone with node.js(express) react.js graphql mongodb

# used libraries

- Server (BackEnd)

  - express
  - cors
  - validator // vaildate email address
  - lodash // in the user Resolver
  - jsonwebtoken // user login authentication
  - graphql-subscriptions
  - subscriptions-transport-ws

- GraphQL

  - apollo-server-express
  - apollo-link-error
  - merge-graphql-schemas
  - bcrypt (to make hashed password)

- View (FrontEnd)
  - react
  - @apollo/client
  - semantic-ui-react, semantic-ui-css
  - mobx, mobx-react
  - jwt-decode (jsonwebtoken-decode) // for checking fake token
  - styled-components // for layout and CSS
  - formik // for managing Form tag
    // for WebSocket
  - apollo-link-ws
  - apollo-utilities
  - subscriptions-transport-ws

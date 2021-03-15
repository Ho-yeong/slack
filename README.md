# Slack - Clone (구 버전 UI)

Node.js express 기반의 GraphQL을 사용하여 데이터 통신
Web Socket을 사용하여 realtime 채팅 구현 

- 실험적으로 mongoDB를 관계형 데이터베이스 구조로 만들어 구현

## used stacks

```
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

- View (Front End)
  - react
  - @apollo/client
  - semantic-ui-react, semantic-ui-css
  - mobx, mobx-react
  - jwt-decode (jsonwebtoken-decode) // for checking fake token
  - styled-components // for layout and CSS
  - formik // for managing Form tag
  - apollo-link-ws   // for WebSocket
  - apollo-utilities
  - subscriptions-transport-ws
  ```

### Run Server / 서버 실행

```
npm start
```

### [Schema](https://github.com/Ho-yeong/slack/tree/master/schema)
### [Resolver](https://github.com/Ho-yeong/slack/tree/master/resolver)




## Front End Repository

###[Slack-client](https://github.com/Ho-yeong/slack-client)

## Main UI

![화면 캡처 2021-03-15 145220](https://user-images.githubusercontent.com/58277160/111109447-15ae3f00-859e-11eb-80c6-f5930ea54d3a.png)

## Main Function / 주요 기능

* 회원가입
* 로그인 ( JWT 토큰 사용 인증 )
* 팀 생성
* 채널 생성
* 팀 멤버 추가
* 채널 별 리얼타임 채팅

## Acknowledgments / 감사의 말

* Thank you for coming here
# graphql-typings-generation

Demonstrates generating TypeScript types from a GraphQL server. ✨

## Usage

Start off by installing dependencies:

```shell
yarn
```

### GraphQL Server

Start the base GraphQL server:

```shell
yarn start
```

You'll then be able to view the GraphQL API server at http://localhost:4000/graphql.

Some useful GraphiQL links include:

- [Querying for characters in the Hilda cartoon](<http://localhost:4000/graphql?query=%7B%0A%20%20characters(cartoon%3A%20%22Hilda%22)%20%7B%0A%20%20%20%20age%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A>)
- [Querying for type names](http://localhost:4000/graphql?query=%7B%0A%20%20__schema%20%7B%0A%20%20%20%20types%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
- [Querying for fields on the "Character" type](<http://localhost:4000/graphql?query=%7B%0A%20%20__type(name%3A%20%22Character%22)%20%7B%0A%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A>)

### Codegen

Next, in a separate terminal, you can trigger code generation based off that GraphQL server:

```shell
yarn generate
```

Generated types will then exist in `src/generated/types.d.ts`.

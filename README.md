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

### Codegen

Next, in a separate terminal, you can trigger code generation based off that GraphQL server:

```shell
yarn generate
```

Generated types will then exist in `src/generated/types.d.ts`.

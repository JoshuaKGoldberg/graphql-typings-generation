import { promises as fs } from "fs";
import fetch from "node-fetch";

const response = await fetch("http://localhost:4000/graphql", {
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            name
            fields {
              name
              type {
                kind
                name
                ofType {
                  name
                }
              }
            }
          }
        }
      }
    `,
  }),
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  method: "POST",
});

const body = await response.json();

const knownTypes = {
  builtIn: new Set(["Boolean", "Query", "String"]),
  equivalent: new Map([
    ["Float", "number"],
    ["ID", "string"],
    ["Int", "number"],
  ]),
};

const types = body.data.__schema.types
  .filter((rawType) => {
    return (
      !rawType.name.startsWith("__") && !knownTypes.builtIn.has(rawType.name)
    );
  })
  .map((rawType) => {
    const equivalent = knownTypes.equivalent.get(rawType.name);
    if (equivalent) {
      return `export type ${rawType.name} = ${equivalent};`;
    }

    return [
      `export interface ${rawType.name} {`,
      ...rawType.fields.map(stringifyField),
      `}`,
    ].join("\n");
  })
  .join("\n\n");

await fs.mkdir("generated", { recursive: true });
await fs.writeFile("generated/types.d.ts", types);

function stringifyField(field) {
  return `  ${field.name}${stringifyFieldValue(field)};`;
}

function stringifyFieldValue(field) {
  switch (field.type.kind) {
    case "SCALAR":
      return `?: ${field.type.name}`;
    case "LIST":
      return `: ${field.type.ofType.name}[]`;
    case "NON_NULL":
      return `: ${field.type.ofType.name}`;
  }
}

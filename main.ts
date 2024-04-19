import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { Query } from './src/resolvers/Query';
import path from 'path';
import fs from "fs";
import { db } from './src/db/db';
import { Cv } from './src/resolvers/Cv';
import {Mutation} from './src/resolvers/Mutation'

interface YogaContext {
  db: typeof db;
}

const resolvers = {
  Query,Cv,Mutation
};

const context: YogaContext = {
  db
};

const yoga = createYoga<YogaContext>({
  schema: createSchema<YogaContext>({
    typeDefs: fs.readFileSync(path.join(__dirname, "src/schema/schema.graphql"), "utf-8"),
    resolvers
  }),
  context
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});

import { loadFilesSync } from '@graphql-tools/load-files';
/**
 * Use makeExecutableSchema from graphql-tools instead of buildSchema from graphql.js
 * It's more flexible and allows for field-specific resolving of queries.
 */
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { omnyResolvers } from './omny/resolvers';
import { sanityResolvers } from './sanity/resolvers';

const typesArray = loadFilesSync('.', {
    recursive: true,
    extensions: ['gql', 'graphql', 'graphqls'],
});

export const typeDefs = mergeTypeDefs(typesArray);
export const resolvers = mergeResolvers([omnyResolvers, sanityResolvers]);
export const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

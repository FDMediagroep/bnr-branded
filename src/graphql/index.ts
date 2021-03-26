import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { omnyResolvers } from './omny/resolvers';
import { sanityResolvers } from './sanity/resolvers';
import omnyTypes from './omny/schemas.gql';
import sanityTypes from './sanity/schemas.gql';

export const typeDefs = mergeTypeDefs([omnyTypes, sanityTypes]);
export const resolvers = mergeResolvers([omnyResolvers, sanityResolvers]);
/**
 * Use makeExecutableSchema from graphql-tools instead of buildSchema from graphql.js
 * It's more flexible and allows for field-specific resolving of queries.
 */
export const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

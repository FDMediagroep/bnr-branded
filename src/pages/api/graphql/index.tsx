import { graphqlHTTP } from 'express-graphql';
/**
 * Use makeExecutableSchema from graphql-tools instead of buildSchema from graphql.js
 * It's more flexible and allows for field-specific resolving of queries.
 */
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { omnyTypeDefs } from '../../../graphql/omny/schemas';
import { sanityTypeDefs } from '../../../graphql/sanity/schemas';
import { omnyResolvers } from '../../../graphql/omny/resolvers';
import { sanityResolvers } from '../../../graphql/sanity/resolvers';

const typeDefs = mergeTypeDefs([omnyTypeDefs, sanityTypeDefs]);
const resolvers = mergeResolvers([omnyResolvers, sanityResolvers]);
const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

async function handler(req, res) {
    res?.setHeader?.(
        'Cache-Control',
        'max-age=0, max-stale, s-maxage=60, stale-while-revalidate'
    );

    return await graphqlHTTP({
        schema: executableSchema,
        graphiql: { headerEditorEnabled: true },
    })(req, res);
}

export default handler;

import { graphqlHTTP } from 'express-graphql';
import { OmnyQuery, OmnySchema } from '../../../graphql/omny/schemas';
import {
    OmnyQueryResolvers,
    OmnyFieldResolvers,
} from '../../../graphql/omny/resolvers';
/**
 * Use makeExecutableSchema from graphql-tools instead of buildSchema from graphql.js
 * It's more flexible and allows for field-specific resolving of queries.
 */
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = `
${OmnySchema}

type Query {
    ${OmnyQuery}
}
`;

const resolvers = {
    Query: {
        ...OmnyQueryResolvers,
    },
    ...OmnyFieldResolvers,
};

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

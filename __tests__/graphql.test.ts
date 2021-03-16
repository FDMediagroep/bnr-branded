import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { omnyTypeDefs } from '../src/graphql/omny/schemas';
import { sanityTypeDefs } from '../src/graphql/sanity/schemas';
import { omnyResolvers } from '../src/graphql/omny/resolvers';
import { sanityResolvers } from '../src/graphql/sanity/resolvers';
import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { diff } from '@graphql-inspector/core';

describe('GraphQL', () => {
    const typeDefs = mergeTypeDefs([omnyTypeDefs, sanityTypeDefs]);
    const resolvers = mergeResolvers([omnyResolvers, sanityResolvers]);
    const executableSchema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    let remoteSchema;

    beforeAll(async () => {
        remoteSchema = await loadSchema(
            'https://bnr-branded.vercel.app/api/graphql',
            {
                // load from endpoint
                loaders: [new UrlLoader()],
            }
        );
    });

    test('schema is backward compatible', () => {
        const changes = diff(remoteSchema, executableSchema);
        const breaking = changes.find(
            (change) => change.criticality.level === 'BREAKING'
        );
        expect(breaking).toBeFalsy();
    });
});

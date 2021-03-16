import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { omnyTypeDefs } from '../src/graphql/omny/schemas';
import { sanityTypeDefs } from '../src/graphql/sanity/schemas';
import { omnyResolvers } from '../src/graphql/omny/resolvers';
import { sanityResolvers } from '../src/graphql/sanity/resolvers';

describe('GraphQL', () => {
    const typeDefs = mergeTypeDefs([omnyTypeDefs, sanityTypeDefs]);
    const resolvers = mergeResolvers([omnyResolvers, sanityResolvers]);
    const executableSchema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    test('schema is backward compatible', () => {
        expect(executableSchema).toMatchSnapshot();
    });
});

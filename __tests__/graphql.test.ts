import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { diff } from '@graphql-inspector/core';
import { executableSchema } from '../src/graphql';

describe('GraphQL', () => {
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
        const messages = changes
            .map((change) => {
                if (change?.criticality?.level === 'BREAKING') {
                    return `${change?.type} - ${change?.path} - ${
                        change?.message
                    }${
                        change?.criticality?.reason
                            ? ` - ${change?.criticality?.reason}`
                            : ''
                    }`;
                }
            })
            .filter((message) => message !== undefined);
        expect(messages.join('\n')).toBeFalsy();
    });
});

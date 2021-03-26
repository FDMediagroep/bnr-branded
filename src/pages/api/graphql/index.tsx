import depthLimit from 'graphql-depth-limit';
import { graphqlHTTP } from 'express-graphql';
import { executableSchema } from '../../../graphql';

async function handler(req, res) {
    res?.setHeader?.(
        'Cache-Control',
        'max-age=0, max-stale, s-maxage=60, stale-while-revalidate'
    );

    return await graphqlHTTP({
        schema: executableSchema,
        validationRules: [depthLimit(4)],
        graphiql: { headerEditorEnabled: true },
    })(req, res);
}

export default handler;

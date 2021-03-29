import depthLimit from 'graphql-depth-limit';
import { graphqlHTTP } from 'express-graphql';
import { executableSchema } from '../../../graphql';

async function handler(req, res) {
    return await graphqlHTTP({
        schema: executableSchema,
        validationRules: [depthLimit(4)],
        graphiql: { headerEditorEnabled: true },
    })(req, res);
}

export default handler;

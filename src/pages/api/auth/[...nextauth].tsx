import Cors from 'micro-cors';
const cors = Cors({ allowMethods: ['GET', 'POST', 'HEAD', 'OPTIONS'] });
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

async function handler(req, res) {
    return await NextAuth(req, res, {
        // Configure one or more authentication providers
        providers: [
            Providers.Cognito({
                id: 'cognito',
                name: 'Cognito',
                clientId: process.env.COGNITO_CLIENT_ID,
                clientSecret: process.env.COGNITO_CLIENT_SECRET,
                domain: process.env.COGNITO_DOMAIN,
                profile: (profile) => {
                    console.log(profile);
                    return {
                        id: profile.sub,
                        name: profile.username,
                        email: profile.email,
                        image: null,
                    };
                },
            }),
            // ...add more providers here
        ],
        pages: {
            signIn: '/auth/signin',
            signOut: null,
            error: null, // Error code passed in query string as ?error=
            verifyRequest: null, // (used for check email message)
            newUser: null, // If set, new users will be directed here on first sign in
        },
    });
}

export default cors(handler);

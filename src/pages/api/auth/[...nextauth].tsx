import Cors from 'micro-cors';
const cors = Cors({ allowMethods: ['GET', 'POST', 'HEAD', 'OPTIONS'] });
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

async function handler(req, res) {
    return await NextAuth(req, res, {
        // Configure one or more authentication providers
        providers: [
            {
                id: 'auth0',
                name: 'Auth0',
                type: 'oauth',
                version: '2.0',
                scope: 'openid email',
                params: { grant_type: 'authorization_code' },
                authorizationUrl:
                    'https://roster-next.eu.auth0.com/authorize?response_type=code',
                accessTokenUrl: 'https://roster-next.eu.auth0.com/oauth/token',
                requestTokenUrl: 'https://roster-next.eu.auth0.com/oauth/token',
                profileUrl: 'https://roster-next.eu.auth0.com/userinfo',
                clientId: 'YMPvw6PAqFCuopDAn0qMosslFxghLMLg',
                clientSecret:
                    'N0w_Q7LFfXdVAxQEeCTpjjX1ybnPfS0kEtbGbyoc3DAD1AvvR40utWyVlJdcnmtS',
                async profile(profile) {
                    console.log(profile);
                    return {
                        id: profile.sub,
                        email: profile.email,
                    };
                },
            },
            Providers.Cognito({
                // id: 'cognito',
                // name: 'Cognito',
                clientId: process.env.COGNITO_CLIENT_ID,
                clientSecret: process.env.COGNITO_CLIENT_SECRET,
                domain: process.env.COGNITO_DOMAIN,
                pages: {
                    signIn: '/auth/signin',
                    signOut: null,
                    error: null, // Error code passed in query string as ?error=
                    verifyRequest: null, // (used for check email message)
                    newUser: null, // If set, new users will be directed here on first sign in
                },
            }),
            // ...add more providers here
        ],
    });
}

export default cors(handler);

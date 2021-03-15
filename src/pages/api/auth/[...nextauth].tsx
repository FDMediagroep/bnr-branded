import Cors from 'micro-cors';
const cors = Cors({ allowMethods: ['GET', 'POST', 'HEAD', 'OPTIONS'] });
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const baseUrl =
    'https://z1s06059b7.execute-api.eu-west-1.amazonaws.com/Implementation';

async function handler(req, res) {
    return await NextAuth(req, res, {
        // Configure one or more authentication providers
        providers: [
            Providers.Credentials({
                id: 'cognito-custom',
                // The name to display on the sign in form (e.g. 'Sign in with...')
                name: 'Credentials',
                // The credentials is used to generate a suitable form on the sign in page.
                // You can specify whatever fields you are expecting to be submitted.
                // e.g. domain, username, password, 2FA token, etc.
                credentials: {
                    username: {
                        label: 'E-mail',
                        type: 'text',
                        placeholder: 'jan@jansen.nl',
                    },
                    password: { label: 'Password', type: 'password' },
                },
                async authorize(credentials) {
                    // Add logic here to look up the user from the credentials supplied
                    const user = await fetch(baseUrl + '/sign_in', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials.username,
                            password: credentials.password,
                        }),
                    }).then((res) => res.json());

                    if (user && user.success) {
                        // Any object returned will be saved in `user` property of the JWT
                        // We can't put a lot of data in this user object. So keep this to a
                        // bare minimum.
                        user.name = user.cognito;
                        return user;
                    } else {
                        // If you return null or false then the credentials will be rejected
                        throw '/auth/signin?error=Wrong login';
                        // You can also Reject this callback with an Error or with a URL:
                        // throw new Error('error message') // Redirect to error page
                        // throw '/path/to/redirect'        // Redirect to a URL
                    }
                },
            }),
            Providers.Cognito({
                id: 'cognito',
                name: 'Cognito',
                clientId: process.env.COGNITO_CLIENT_ID,
                clientSecret: process.env.COGNITO_CLIENT_SECRET,
                domain: process.env.COGNITO_DOMAIN,
                profile: (profile) => {
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

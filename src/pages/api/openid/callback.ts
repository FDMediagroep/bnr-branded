import Cors from 'micro-cors';
const cors = Cors({ allowMethods: ['GET', 'POST', 'HEAD', 'OPTIONS'] });
import cookie from 'cookie';
import { Issuer } from 'openid-client';

async function handler(req, res) {
    const cookies = cookie.parse(req.headers.cookie || '');
    console.log(new Date(), req.method, 'params', req.query, req.body);
    const code_verifier = cookies.code_verifier;

    let userinfo = {};
    const issuer = await Issuer.discover(process.env.KEYCLOAK_ISSUER);
    // console.log("Discovered issuer", issuer);

    const client = new issuer.Client({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        redirect_uris: [
            `${process.env.NEXTAUTH_URL}/api/openid/callback`,
            process.env.NEXTAUTH_URL,
        ],
    });

    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.oauthCallback(
            `${process.env.NEXTAUTH_URL}`,
            params,
            {
                code_verifier,
            }
        );
        console.log(new Date(), 'received and validated tokens', tokenSet);
        console.log(new Date(), 'validated ID Token claims', tokenSet.claims());

        if (tokenSet?.refresh_token) {
            console.log('Refresh token received');
            // tokenSet = await client.refresh(tokenSet.refresh_token);
            // console.log(new Date(), 'refreshed and validated tokens', tokenSet);
            // console.log(
            //     new Date(),
            //     'refreshed ID Token claims',
            //     tokenSet.claims()
            // );
        }

        if (tokenSet?.access_token) {
            userinfo = await client.userinfo(tokenSet.access_token);
            console.log(new Date(), 'userinfo', userinfo);
        }
    } catch (e) {
        console.log(new Date(), e.message);
    }

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('userinfo', JSON.stringify(userinfo), {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 365,
        })
    );

    res.redirect(302, `${process.env.NEXTAUTH_URL}/openid`);
}

export default cors(handler);

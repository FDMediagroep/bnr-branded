import React from 'react';
import cookie from 'cookie';
import styles from './index.module.scss';
import { Issuer, generators } from 'openid-client';
import '@fdmg/bnr-design-system/components/button/Button.css';
import { Button } from '@fdmg/bnr-design-system/components/button/Button';
import { GetServerSideProps } from 'next';
import getRawBody from 'raw-body';

function Page(props: any) {
    function goToAuth() {
        window.location.href = props.authorizationUrl;
    }

    async function logout() {
        await fetch(
            `${window.location.protocol}//${window.location.host}/api/openid/logout`
        ).catch(console.error);
        window.location.href = props.endSessionUrl;
    }

    return (
        <section className={styles.login}>
            <h1>Keycloak</h1>

            {!props?.userinfo?.email && (
                <p className={styles.notLoggedIn}>
                    OpenID-Client not logged in
                </p>
            )}

            {props?.userinfo?.email && (
                <section className={styles.admin}>
                    <h2>Success! {props?.userinfo?.email}</h2>
                </section>
            )}

            <h2>OpenID-Client</h2>
            <textarea readOnly defaultValue={props.authorizationUrl} />
            <Button onClick={goToAuth}>Sign in</Button>
            <textarea readOnly defaultValue={props.endSessionUrl} />
            <Button onClick={logout}>Sign out</Button>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log(context.req.method);
    const body = await getRawBody(context.req);
    console.log(body.toString());

    const cookies = cookie.parse(context.req.headers.cookie || '');
    let code_verifier = generators.codeVerifier();
    if (!cookies?.code_verifier) {
        context.res.setHeader(
            'Set-Cookie',
            cookie.serialize('code_verifier', code_verifier, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 365,
            })
        );
    } else {
        code_verifier = cookies.code_verifier;
    }
    const userinfo = JSON.parse(cookies?.userinfo ?? '{}');

    const code_challenge = generators.codeChallenge(code_verifier);

    const issuer = await Issuer.discover(process.env.KEYCLOAK_ISSUER);
    // console.log('Discovered issuer', issuer);

    const client = new issuer.Client({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        redirect_uris: [
            `${process.env.NEXTAUTH_URL}/api/openid/callback`,
            process.env.NEXTAUTH_URL,
        ],
        response_types: ['code'],
    });

    const authorizationUrl = client.authorizationUrl({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        scope: 'openid email',
        code_challenge,
        code_challenge_method: 'S256',
        response_type: 'code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/openid/callback`,
    });

    const endSessionUrl = client.endSessionUrl();

    return {
        props: {
            authorizationUrl,
            endSessionUrl,
            userinfo,
        },
    };
};

export default Page;

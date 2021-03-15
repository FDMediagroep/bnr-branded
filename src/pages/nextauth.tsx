import React from 'react';
import styles from './index.module.scss';
import { ButtonCta } from '@fdmg/bnr-design-system/components/button/ButtonCta';
import { GetServerSideProps } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';

function Page() {
    const [session, loading] = useSession();

    return (
        <section className={styles.login}>
            <h1>AUTH0</h1>

            {!loading && !session && (
                <p className={styles.notLoggedIn}>Next-Auth not logged in</p>
            )}
            {!loading && session && (
                <section className={styles.admin}>
                    <h2>Success! {session.user.email}</h2>
                </section>
            )}

            <h2>Next-Auth</h2>
            <ButtonCta onClick={() => signIn('auth0')}>Sign In</ButtonCta>
            <ButtonCta onClick={() => signOut()}>Sign Out</ButtonCta>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });

    return {
        props: {
            session,
        },
    };
};

export default Page;

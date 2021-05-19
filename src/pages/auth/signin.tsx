import React from 'react';
import { csrfToken, getSession, signOut, useSession } from 'next-auth/client';
import '@fdmg/bnr-design-system/components/button/Button.css';
import { Button } from '@fdmg/bnr-design-system/components/button/Button';
import '@fdmg/bnr-design-system/components/input/TextInput.css';
import { TextInput } from '@fdmg/bnr-design-system/components/input/TextInput';
import styles from './signin.module.scss';
import { GetServerSideProps } from 'next';
import { ButtonCta } from '@fdmg/bnr-design-system/components/button/ButtonCta';
import { getPrograms } from '../../utils/omnyHelper';

function SignIn({ csrfToken }) {
    const [session, loading] = useSession();

    return (
        <section className={styles.signin}>
            {!loading && !session && (
                <form method="post" action="/api/auth/callback/cognito-custom">
                    <input
                        name="csrfToken"
                        type="hidden"
                        defaultValue={csrfToken}
                    />
                    <TextInput
                        type="text"
                        id="username"
                        name="username"
                        label="E-mail"
                    />
                    <TextInput
                        type="password"
                        id="password"
                        name="password"
                        label="Wachtwoord"
                    />
                    <Button type="submit">Sign in</Button>
                </form>
            )}

            {!loading && session && (
                <ButtonCta onClick={() => signOut()}>Sign Out</ButtonCta>
            )}
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    return {
        props: {
            Programs: await getPrograms(process.env.OMNY_ORGID),
            csrfToken: await csrfToken(context),
            session,
        },
    };
};

export default SignIn;

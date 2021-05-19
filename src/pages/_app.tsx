import React, { useEffect } from 'react';
import './_app.scss';
import '@fdmg/bnr-design-system/components/menu/Menu.css';
import {
    BNRIcon,
    SpyglassIcon,
} from '@fdmg/bnr-design-system/design-tokens/icons';
import { Menu } from '@fdmg/bnr-design-system/components/menu/Menu';
import '@fdmg/bnr-design-system/components/design-tokens/design-tokens.css';
import '@fdmg/css-grid/css/grid.css';
import { Player } from '../components/player/Player';
import styles from './_app.module.scss';
import Link from 'next/link';
import { Programs } from '../utils/models';
import { Provider, signIn, signOut } from 'next-auth/client';
import '@fdmg/bnr-design-system/components/button/ButtonCta.css';
import { ButtonCta } from '@fdmg/bnr-design-system/components/button/ButtonCta';
import { handleSearchSubmit } from '../utils/searchHelper';
import UserStore from '../stores/UserStore';

interface PageProps {
    Programs: Programs;
    [x: string]: any;
}

function Page({
    Component,
    pageProps,
}: {
    Component: any;
    pageProps: PageProps;
}) {
    useEffect(() => {
        console.log(pageProps?.session);
        if (pageProps?.session?.user) {
            UserStore.setUserData({
                ...UserStore.getUserData(),
                ...pageProps?.session?.user,
            });
        }
    }, [pageProps.session]);

    function handleSearchBlur(e: React.FocusEvent<HTMLInputElement>) {
        const target = e.currentTarget;
        setTimeout(() => {
            target.value = '';
        }, 300);
    }

    return (
        <Provider session={pageProps.session}>
            <Menu
                className={styles.menu}
                ariaLabel="Main menu"
                menuItems={[
                    {
                        component: (
                            <Link href="/">
                                <a style={{ padding: '0' }}>
                                    <span
                                        className={styles.logo}
                                        dangerouslySetInnerHTML={{
                                            __html: BNRIcon,
                                        }}
                                        aria-label="BNR Branded Podcasts"
                                    />
                                </a>
                            </Link>
                        ),
                    },
                    {
                        text: 'Podcasts',
                        isToggle: true,
                        menuItems: [
                            ...(pageProps?.Programs?.Programs?.filter(
                                (program) =>
                                    program.Network == 'Development test'
                            ).map((program) => {
                                return {
                                    component: (
                                        <Link
                                            key={program.Id}
                                            href={`/program/${program.Slug}`}
                                        >
                                            <a>{program.Name}</a>
                                        </Link>
                                    ),
                                };
                            }) ?? []),
                        ],
                    },
                    {
                        component: (
                            <Link href={`/mijnbnr`}>
                                <a>Mijn BNR</a>
                            </Link>
                        ),
                    },
                ]}
                moreMenuItems={[
                    {
                        component: (
                            <section className={`${styles.moreMenuLogin} grid`}>
                                {!pageProps.session && (
                                    <ButtonCta
                                        className="xs-12"
                                        onClick={() => signIn()}
                                    >
                                        Sign In
                                    </ButtonCta>
                                )}
                                {!pageProps.session && (
                                    <ButtonCta
                                        className="xs-12"
                                        onClick={() => signIn('auth0')}
                                    >
                                        Sign In OIDC Auth0
                                    </ButtonCta>
                                )}
                                {!pageProps.session && (
                                    <ButtonCta
                                        className="xs-12"
                                        onClick={() => signIn('cognito')}
                                    >
                                        Sign In OIDC Next-Auth
                                    </ButtonCta>
                                )}
                                {!pageProps.session && (
                                    <Link href="/openid">
                                        <ButtonCta className="xs-12">
                                            Sign In OIDC Keycloak
                                        </ButtonCta>
                                    </Link>
                                )}
                                {pageProps.session && (
                                    <ButtonCta
                                        className="xs-12"
                                        onClick={() => signOut()}
                                    >
                                        Sign Out
                                    </ButtonCta>
                                )}
                            </section>
                        ),
                    },
                ]}
            >
                <>
                    <form
                        method="GET"
                        action="/search"
                        onSubmit={handleSearchSubmit}
                    >
                        <div className={styles.search}>
                            <input
                                name="q"
                                placeholder="Search..."
                                onBlur={handleSearchBlur}
                                aria-label="Search text"
                            />
                            <button
                                type="submit"
                                name="search"
                                dangerouslySetInnerHTML={{
                                    __html: SpyglassIcon,
                                }}
                                aria-label="Search submit"
                            />
                        </div>
                    </form>
                    <section>
                        {!pageProps.session && (
                            <ButtonCta onClick={() => signIn()}>
                                Sign In
                            </ButtonCta>
                        )}
                        {pageProps.session && (
                            <ButtonCta onClick={() => signOut()}>
                                Sign Out
                            </ButtonCta>
                        )}
                    </section>
                </>
            </Menu>

            <Component {...pageProps} />
            <Player url={pageProps?.audioUrl} />
        </Provider>
    );
}

export default Page;

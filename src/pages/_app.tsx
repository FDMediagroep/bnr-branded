import React from 'react';
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
import Router from 'next/router';
import { Programs } from '../utils/models';
import { LoginBox } from '../components/loginbox/LoginBox';

const dummyFn = () => {
    console.log('dummy');
};

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
    function handleSearchBlur(e: React.FocusEvent<HTMLInputElement>) {
        const target = e.currentTarget;
        setTimeout(() => {
            target.value = '';
        }, 300);
    }

    function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let s = '';
        for (const pair of formData.entries()) {
            if (typeof pair[1] == 'string') {
                s +=
                    (s ? '&' : '') +
                    encodeURI(pair[0]) +
                    '=' +
                    encodeURI(pair[1]);
            }
        }
        Router.push(`/search?${s}`);
    }

    return (
        <>
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
                    <LoginBox />
                </>
            </Menu>

            <Component {...pageProps} />
            <Player url={pageProps?.audioUrl} />
        </>
    );
}

export default Page;

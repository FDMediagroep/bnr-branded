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
import { Programs } from '../utils/models';

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
                    <form method="GET" action="/search" onSubmit={dummyFn}>
                        <div className={styles.search}>
                            <input
                                name="q"
                                placeholder="Search..."
                                onBlur={dummyFn}
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
                </>
            </Menu>

            <Component {...pageProps} />
            <Player url={pageProps?.audioUrl} />
        </>
    );
}

export default Page;

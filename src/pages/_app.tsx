import React from 'react';
import './_app.scss';
import '@fdmg/bnr-design-system/components/design-tokens/design-tokens.css';
import '@fdmg/css-grid/css/grid.css';
import { Menu } from '../components/menu/Menu';
import { Player } from '../components/player/Player';

function Page({ Component, pageProps }) {
    return (
        <>
            <Menu Programs={pageProps.Programs} />
            <Component {...pageProps} />
            <Player url={pageProps?.audioUrl} />
        </>
    );
}

export default Page;

import React from 'react';
import './_app.scss';
import '@fdmg/bnr-design-system/components/design-tokens/design-tokens.css';
import '@fdmg/css-grid/css/grid.css';

function Page({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default Page;

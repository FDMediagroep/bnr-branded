import React from 'react';
import Styles from './index.module.scss';

function Page(props: any) {
    return (
        <h1 className={Styles.page}>Hello World ( {props.SANITY_TOKEN} )</h1>
    );
}
export function getStaticProps() {
    return { props: { SANITY_TOKEN: process.env.SANITY_TOKEN } };
}

export default Page;

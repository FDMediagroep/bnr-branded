import React from 'react';
import Styles from './index.module.scss';

function Page(props: any) {
    return <h1 className={Styles.page}>Hello World</h1>;
}
export function getStaticProps() {
    console.log(process.env.SANITY_TOKEN);
    return { props: {} };
}

export default Page;

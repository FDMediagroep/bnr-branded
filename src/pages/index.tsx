import React from 'react';
import Styles from './index.module.scss';
import '@fdmg/bnr-design-system/components/button/Button.css';
import { Button } from '@fdmg/bnr-design-system/components/button/Button';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';
import { VerticalCard1 } from '@fdmg/bnr-design-system/components/card/VerticalCard1';

function Page(props: any) {
    function handleClick() {
        console.log('clicked');
    }

    return (
        <>
            <h1 className={Styles.page}>Hello World</h1>
            <Button onClick={handleClick}>Click me!</Button>
            <section className="grid">
                <main className="m-9"></main>
                <aside className="m-3"></aside>
            </section>

            <div className="grid">
                <div className="grid xs-6 l-12">
                    <div className="xs-6">1.1</div>
                    <div className="xs-6">1.2</div>
                </div>
                <div className="xs-6 l-12">2</div>
            </div>

            <VerticalCard1
                date="24 februari 2021"
                duration="24 min."
                footerText="Zorg voor mensen in de zorg"
                footerUrl="/zorg-voor-mensen-in-de-zorg"
                href="https://fd.nl/economie-politiek/1345422/lockdown-leidt-tot-recordstijging-aantal-ww-uitkeringen-in-april"
                id="1345422"
                imageUrl="https://images.fd.nl/Cz9PTU-el_agiaSDvJOfmwrvu6g.jpg?rect=.0%2c.0428571428571429%2c.9999999999999999%2c.95&fit=crop&crop=faces&auto=format&q=45&w=599&h=399"
                imageUrlL="https://images.fd.nl/Cz9PTU-el_agiaSDvJOfmwrvu6g.jpg?rect=.0%2c.0428571428571429%2c.9999999999999999%2c.95&fit=crop&crop=faces&auto=format&q=45&w=599&h=399"
                imageUrlM="https://images.fd.nl/Cz9PTU-el_agiaSDvJOfmwrvu6g.jpg?rect=.0%2c.0428571428571429%2c.9999999999999999%2c.95&fit=crop&crop=faces&auto=format&q=45&w=351&h=234"
                imageUrlS="https://images.fd.nl/Cz9PTU-el_agiaSDvJOfmwrvu6g.jpg?rect=.0%2c.0428571428571429%2c.9999999999999999%2c.95&fit=crop&crop=faces&auto=format&q=45&w=599&h=399"
                label="Arbeidsmarkt"
                madePossibleBy="Brainnet"
                madePossibleLink="https://www.brainnet.nl"
                overlayImageUrl="https://bnr-external-prod.imgix.net/40ae3951f39151b1f98ee0850cc1d9a89ae20c51.png"
                overlayLinkUrl="https://fd.nl/economie-politiek/1345422/lockdown-leidt-tot-recordstijging-aantal-ww-uitkeringen-in-april"
                title="Lockdown leidt tot recordstijging aantal WW-uitkeringen in april"
            />
        </>
    );
}

export function getStaticProps() {
    console.log(process.env.SANITY_TOKEN);
    return { props: {} };
}

export default Page;

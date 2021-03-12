import React from 'react';
import styles from './index.module.scss';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';
import { VerticalCard1 } from '@fdmg/bnr-design-system/components/card/VerticalCard1';
import { Programs } from '../utils/models';
import { getPrograms } from '../utils/omnyHelper';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface Props {
    Programs: Programs;
}

function Page(props: Props) {
    return (
        <section className="grid default-content-body">
            <main className="xs-12 m-9">
                <section>
                    <h1 className="heading sans l">Brand stories</h1>
                    <p className={`${styles.introText} body-text sans s`}>
                        Bedrijven en organisaties zitten vol verhalen. In Brand
                        Stories worden deze inspirerende en informatieve
                        verhalen verteld.
                    </p>
                </section>
                {props?.Programs?.Programs?.length > 0 ? (
                    <section className="grid">
                        {props?.Programs?.Programs?.filter(
                            (program) => program.Network == 'Development test'
                        ).map((program) => {
                            return (
                                <VerticalCard1
                                    key={program.Id}
                                    className={`fullHeight xs-12 s-6 m-4`}
                                    href={`/program/${program.Slug}`}
                                    imageUrl={program.ArtworkUrl}
                                    madePossibleBy={program.ContactName}
                                    madePossibleLink={`mailto:${program.ContactEmail}`}
                                    title={program.Name}
                                    Link={Link}
                                    footerText={program.Name}
                                    footerUrl={`/program/${program.Slug}`}
                                />
                            );
                        })}
                    </section>
                ) : null}
            </main>
            <aside className="xs-12 m-3">ASIDE</aside>
        </section>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            Programs: await getPrograms(process.env.OMNY_ORGID),
        },
        revalidate: 10,
    };
};

export default Page;

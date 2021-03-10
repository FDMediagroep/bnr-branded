import React from 'react';
import styles from './index.module.scss';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';
import { VerticalCard1 } from '@fdmg/bnr-design-system/components/card/VerticalCard1';
import { getPrograms, Programs } from '../utils/omnyHelper';
import Link from 'next/link';

interface Props {
    Programs: Programs;
}

function Page(props: Props) {
    return (
        <>
            <h1 className={styles.page}>Branded podcasts</h1>

            {props?.Programs?.Programs?.length > 0 ? (
                <section className="grid">
                    {props?.Programs?.Programs?.map((program) => {
                        return (
                            <VerticalCard1
                                key={program.Id}
                                className={`fullHeight xs-12 s-6 m-4 l-3`}
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
        </>
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

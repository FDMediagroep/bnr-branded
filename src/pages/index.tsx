import React from 'react';
import styles from './index.module.scss';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';
import { VerticalCard1 } from '@fdmg/bnr-design-system/components/card/VerticalCard1';
import '@fdmg/bnr-design-system/components/card/HorizontalCard1.css';
import { HorizontalCard1 } from '@fdmg/bnr-design-system/components/card/HorizontalCard1';
import { Program, Programs } from '../utils/models';
import { getProgramDetails, getPrograms } from '../utils/omnyHelper';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getDeskedPodcasts } from '../utils/sanityHelper';

interface Props {
    Programs: Programs;
    Top5: Program[];
}

function Page(props: Props) {
    return (
        <section className={`${styles.page} grid default-content-body`}>
            <main className="xs-12 m-8 l-9">
                <section>
                    <h1 className={`${styles.header} heading sans l`}>
                        Brand stories
                    </h1>
                    <p className={`${styles.introText} body-text sans s`}>
                        Bedrijven en organisaties zitten vol verhalen. In Brand
                        Stories worden deze inspirerende en informatieve
                        verhalen verteld.
                    </p>
                </section>
                {props?.Programs?.Programs?.length > 0 ? (
                    <section>
                        {props?.Programs?.Programs?.filter(
                            (program) => program.Network == 'Development test'
                        ).map((program) => {
                            return (
                                <HorizontalCard1
                                    key={program.Id}
                                    id={program.Id}
                                    href={`/program/${program.Slug}`}
                                    imageUrl={program.ArtworkUrl}
                                    title={program.Name}
                                    Link={Link}
                                    intro={program.Description}
                                />
                            );
                        })}
                    </section>
                ) : null}
            </main>
            <aside className="xs-12 m-4 l-3">
                <h1 className={`${styles.header} heading sans l`}>
                    Podcast top 5
                </h1>
                {props.Top5.length ? (
                    <section className="grid">
                        {props.Top5.map((program) => {
                            return (
                                <VerticalCard1
                                    key={program.Id}
                                    id={program.Id}
                                    className="xs-12 s-6 m-12"
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
            </aside>
        </section>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const result = await getDeskedPodcasts('Top 5 Home');
    const podcasts = [];

    if (result.length) {
        for (let i = 0; i < result[0].podcasts.length; i++) {
            const podcast = await getProgramDetails(
                process.env.OMNY_ORGID,
                result[0].podcasts[i]['_id']
            );
            podcasts.push(podcast);
        }
    }

    return {
        props: {
            Programs: await getPrograms(process.env.OMNY_ORGID),
            Top5: podcasts,
        },
        revalidate: 10,
    };
};

export default Page;

import '@fdmg/bnr-design-system/components/card/HorizontalCard1.css';
import { HorizontalCard1 } from '@fdmg/bnr-design-system/components/card/HorizontalCard1';
import React from 'react';
import { search } from '../../utils/searchHelper';
import Link from 'next/link';
import '@fdmg/bnr-design-system/components/button/ButtonGhost.css';
import { ButtonGhost } from '@fdmg/bnr-design-system/components/button/ButtonGhost';
import styles from './Search.module.scss';

interface Props {
    q?: string;
    hits: any;
}

function Page(props: Props) {
    function hasNext() {
        return props.hits.hits.found - props.hits.hits.start > 25;
    }

    return props.hits ? (
        <section className={`${styles.search} default-content-body grid`}>
            <main className="xs-12 m-8 l-9">
                {props.hits.hits.found ? (
                    <h1 className={`${styles.header} heading sans l`}>
                        {props.hits.hits.found} Resultaten
                    </h1>
                ) : (
                    <h1 className={`${styles.header} heading sans l`}>
                        Geen resultaten
                    </h1>
                )}

                {props.hits.hits.found > 25 ? (
                    <section className={styles.pagination}>
                        <Link
                            href={`/search?q=${props.q}&start=${Math.max(
                                props.hits.hits.start - 25,
                                0
                            )}`}
                        >
                            <ButtonGhost disabled={props.hits.hits.start == 0}>
                                &lt;
                            </ButtonGhost>
                        </Link>
                        <Link
                            href={`/search?q=${props.q}&start=${
                                props.hits.hits.start + 25
                            }`}
                        >
                            <ButtonGhost disabled={!hasNext()}>
                                &gt;
                            </ButtonGhost>
                        </Link>
                    </section>
                ) : null}

                {props.hits.hits.hit.map((hit) => {
                    return (
                        <HorizontalCard1
                            key={hit.id}
                            id={hit.id}
                            title={hit.fields.title}
                            href={`/search?q=${props.q}`}
                            label={props.hits.fields?.episode ?? null}
                        />
                    );
                })}
            </main>
            <aside className="xs-12 m-4 l-3">ASIDE</aside>
        </section>
    ) : null;
}

export async function getServerSideProps(ctx) {
    const q = ctx.query.q || 'dog|-dog';
    const start = ctx.query.start || 0;
    const hits = await search(q, start);
    return { props: { q, start, hits: hits } };
}

export default Page;

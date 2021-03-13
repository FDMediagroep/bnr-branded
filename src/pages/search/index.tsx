import '@fdmg/bnr-design-system/components/card/HorizontalCard1.css';
import { HorizontalCard1 } from '@fdmg/bnr-design-system/components/card/HorizontalCard1';
import React from 'react';
import { search } from '../../utils/searchHelper';
import styles from './Search.module.scss';
import { Pagination } from '../../components/pagination/Pagination';
import Link from 'next/link';

interface Props {
    q?: string;
    hits: any;
}

function Page(props: Props) {
    function hasPrev() {
        return props.hits.hits.start > 0;
    }

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
                    <Pagination
                        hasPrev={hasPrev()}
                        hasNext={hasNext()}
                        prevUrl={`/search?q=${props.q}&start=${Math.max(
                            props.hits.hits.start - 25,
                            0
                        )}`}
                        nextUrl={`/search?q=${props.q}&start=${
                            props.hits.hits.start + 25
                        }`}
                    />
                ) : null}

                {props.hits.hits.hit.map((hit) => {
                    return (
                        <HorizontalCard1
                            key={hit.id}
                            id={hit.id}
                            title={
                                hit.fields.title + ': ' + hit.fields.published
                            }
                            intro={hit.fields.body?.substring(0, 80)}
                            href={
                                hit.fields.type == 'episode'
                                    ? `/episode/${hit.fields.slug}`
                                    : `/program/${hit.fields.slug}`
                            }
                            imageUrl={hit.fields.image}
                            label={props.hits.fields?.type}
                            Link={Link}
                        />
                    );
                })}

                {props.hits.hits.found > 25 ? (
                    <Pagination
                        hasPrev={hasPrev()}
                        hasNext={hasNext()}
                        prevUrl={`/search?q=${props.q}&start=${Math.max(
                            props.hits.hits.start - 25,
                            0
                        )}`}
                        nextUrl={`/search?q=${props.q}&start=${
                            props.hits.hits.start + 25
                        }`}
                    />
                ) : null}
            </main>
            <aside className="xs-12 m-4 l-3">
                <h1 className={`${styles.header} heading sans l`}>
                    Soort artikelen
                </h1>
                <ul>
                    {props.hits.facets.type.buckets.map((bucket) => {
                        return (
                            <li key={bucket.value}>
                                {bucket.value}: {bucket.count}
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </section>
    ) : null;
}

export async function getServerSideProps(ctx) {
    const q = ctx.query.q;
    const start = ctx.query.start || 0;
    const hits = await search(q || 'dog|-dog', start);
    return { props: { q, start, hits: hits } };
}

export default Page;

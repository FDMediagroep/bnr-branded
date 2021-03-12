import '@fdmg/bnr-design-system/components/card/HorizontalCard1.css';
import { HorizontalCard1 } from '@fdmg/bnr-design-system/components/card/HorizontalCard1';
import React from 'react';
import { search } from '../../utils/searchHelper';
interface Props {
    q?: string;
    hits: any;
}

function Page(props: Props) {
    return props.hits ? (
        <section className="default-content-body grid">
            <main className="xs-12 m-9">
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
            <aside className="xs-12 m-3">ASIDE</aside>
        </section>
    ) : null;
}

export async function getServerSideProps(ctx) {
    const q = ctx.query.q || 'dog|-dog';
    const hits = await search(q);
    return { props: { q, hits: hits } };
}

export default Page;

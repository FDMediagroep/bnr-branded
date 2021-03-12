import React from 'react';
import { search } from '../../utils/searchHelper';
interface Props {
    hits: any;
}

function Page(props: Props) {
    return props.hits ? (
        <section className="default-content-body grid">
            <main className="xs-12 m-9">
                <ul>
                    {props.hits.hits.hit.map((hit) => {
                        return <li key={hit.id}>{hit.fields.title}</li>;
                    })}
                </ul>
            </main>
            <aside className="xs-12 m-3">ASIDE</aside>
        </section>
    ) : null;
}

export async function getServerSideProps(ctx) {
    const q = ctx.query.q ?? '*';
    const hits = await search(q);
    return { props: { hits: hits } };
}

export default Page;

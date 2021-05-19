import React from 'react';
import gql from 'graphql-tag';
import { GetStaticProps } from 'next';
import { print } from 'graphql/language/printer';

function Page(props: any) {
    return (
        <>
            <label>Query</label>
            <textarea
                defaultValue={props.payload}
                style={{ width: '100%' }}
                rows={10}
            />
            <label>Data</label>
            <textarea
                defaultValue={JSON.stringify(props.data, null, 2)}
                style={{ width: '100%' }}
                rows={15}
            />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const query = gql`
        query GetPrograms($cursor: Int, $pageSize: Int) {
            programs {
                Clips(cursor: $cursor, pageSize: $pageSize) {
                    Clips {
                        Id
                        Title
                    }
                    Cursor
                    TotalCount
                }
            }
        }
    `;

    const payload = JSON.stringify(
        {
            query: print(query),
            variables: { cursor: 1, pageSize: 2 },
        },
        null,
        2
    );

    let data = {};
    try {
        data = await fetch('https://bnr-branded.vercel.app/api/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
            },
            body: payload,
        }).then((res) => res.json());
    } catch (e) {
        console.error(e);
    }
    return { props: { payload, data }, revalidate: 10 };
};

export default Page;

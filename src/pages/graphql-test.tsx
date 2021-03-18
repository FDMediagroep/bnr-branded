import React from 'react';
import gql from 'graphql-tag';
import { GetStaticProps } from 'next';
import { print } from 'graphql/language/printer';

function Page(props: any) {
    return (
        <textarea
            defaultValue={JSON.stringify(props.data, null, 2)}
            style={{ width: '100%' }}
            rows={25}
        />
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const query = gql`
        query GetPrograms {
            programs {
                Clips {
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

    let data = {};

    try {
        data = await fetch('https://bnr-branded.vercel.app/api/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ query: print(query) }),
        }).then((res) => res.json());
    } catch (e) {
        console.error(e);
    }
    return { props: { data }, revalidate: 10 };
};

export default Page;

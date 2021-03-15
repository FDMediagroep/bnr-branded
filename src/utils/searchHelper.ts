import Router from 'next/router';

export async function search(
    query: string,
    start = 0,
    size = 25
): Promise<any> {
    return await fetch(
        `${process.env.CLOUDSEARCH_SEARCH_URL}?q=${encodeURIComponent(
            query
        )}&size=${size}&start=${start}&facet.type={sort:%27count%27,size:5}`
    ).then((res) => res.json());
}

export function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let s = '';
    for (const pair of formData.entries()) {
        if (typeof pair[1] == 'string') {
            s += (s ? '&' : '') + encodeURI(pair[0]) + '=' + encodeURI(pair[1]);
        }
    }
    Router.push(`/search?${s}`);
}

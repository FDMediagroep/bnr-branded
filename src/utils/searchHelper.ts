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

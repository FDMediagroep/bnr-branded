export async function search(
    query: string,
    start = 0,
    size = 25
): Promise<any> {
    return await fetch(
        `${process.env.CLOUDSEARCH_SEARCH_URL}?q=${encodeURIComponent(
            query
        )}&size=${size}&start=${start}`
    ).then((res) => res.json());
}

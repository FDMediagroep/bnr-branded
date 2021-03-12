export async function search(query: string): Promise<any> {
    return await fetch(
        `https://search-bnrbranded-bge7q2xd2ruqvahh4flgrkqtdq.eu-west-1.cloudsearch.amazonaws.com/2013-01-01/search?q=${encodeURIComponent(
            query
        )}&size=25&start=0`
    ).then((res) => res.json());
}

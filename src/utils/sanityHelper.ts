import { ProgramEnrichment } from './models';

export async function getProgramEnrichment(
    sanityToken: string,
    programId: string
): Promise<ProgramEnrichment> {
    const query = encodeURIComponent(
        `*[_type == 'podcast' && _id == '${programId}']{color,sponsors[]{name, url, 'logo': logo.asset->url}}`
    );
    const result = await fetch(
        `https://tws8s7ya.apicdn.sanity.io/v1/data/query/development?query=${query}`,
        {
            headers: {
                Authorization: `Bearer ${sanityToken}`,
                'Content-Type': 'application/json',
            },
        }
    ).then((res) => res.json());

    return result.result[0];
}

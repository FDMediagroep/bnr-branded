import sanityClient from '@sanity/client';
// Use this to convert image relations in sanity response to actual image URL's
// import imageUrlBuilder from '@sanity/image-url';
import { ProgramEnrichment } from './models';
console.log({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
});
export const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
});

export async function getProgramEnrichment(
    programId: string
): Promise<ProgramEnrichment> {
    const params = { programId };
    const result = await client.fetch(
        `*[_type == 'podcast' && _id == $programId]{
                color,sponsors[]{
                    name,
                    url,
                    'logo': logo.asset->url
                }
            }`,
        params
    );
    console.log('SANITY getProgramEnrichment:', programId, result);
    return result?.result?.[0] ?? { color: '#ffffff', sponsors: [] };
}

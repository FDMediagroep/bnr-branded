import sanityClient from '@sanity/client';
// Use this to convert image relations in sanity response to actual image URL's
// import imageUrlBuilder from '@sanity/image-url';
import { DeskedPodcast, ProgramEnrichment } from './models';

export const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID || 'testid',
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: true, // `false` if you want to ensure fresh data
});

export async function getProgramEnrichment(
    programId: string
): Promise<ProgramEnrichment[]> {
    return await client.fetch(
        `*[_type == 'podcast' && _id == '${programId}']{
                color,sponsors[]{
                    name,
                    url,
                    'logo': logo.asset->url
                }
            }`
    );
}

export async function getDeskedPodcasts(
    deskName: string
): Promise<DeskedPodcast[]> {
    return await client.fetch(
        `*[_type == 'podcasts' && title == '${deskName}']{podcasts[]->{_id}}`
    );
}

export async function getDeskedEpisodes(deskName: string): Promise<string[]> {
    return await client.fetch(
        `*[_type == 'episodes' && title == '${deskName}']{epsidode[]->{_id}}`
    );
}

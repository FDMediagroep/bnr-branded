import { Clip, Cursor, Playlist, Playlists, Program, Programs } from './models';

export interface Clips extends Cursor {
    Clips: Clip[];
}

export async function getPrograms(orgId: string): Promise<Programs> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/programs/`
    ).then((res) => res.json());
}

export async function getProgramDetails(
    orgId: string,
    programId: string
): Promise<Program> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/programs/${programId}`
    ).then((res) => res.json());
}

export async function getProgramClips(
    orgId: string,
    programId: string,
    cursor = 1,
    pageSize = 10
): Promise<Clips> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/programs/${programId}/clips?cursor=${cursor}&pageSize=${pageSize}`
    ).then((res) => res.json());
}

export async function getProgramPlaylists(
    orgId: string,
    programId: string
): Promise<Playlists> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/programs/${programId}/playlists`
    ).then((res) => res.json());
}

export async function getPlaylistDetails(
    orgId: string,
    playlistId: string
): Promise<Playlist> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/playlists/${playlistId}`
    ).then((res) => res.json());
}

export async function getPlaylistClips(
    orgId: string,
    playlistId: string,
    cursor = 1,
    pageSize = 10
): Promise<Clips> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/playlists/${playlistId}/clips?cursor=${cursor}&pageSize=${pageSize}`
    ).then((res) => res.json());
}

export async function getClipDetails(
    orgId: string,
    clipId: string
): Promise<Clip> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/clips/${clipId}`
    ).then((res) => res.json());
}

export async function getClipDetailsExt(
    orgId: string,
    externalId: string
): Promise<Clip> {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/clips/externalId?value=${externalId}`
    ).then((res) => res.json());
}

/**
 *
 * @param orgId
 * @param clipId
 * @param format optional. Default: JSON
 * @param speakers optional. Default: true
 */
export async function getClipTranscript(
    orgId: string,
    clipId: string,
    format: 'SubRip' | 'WebVTT' | 'Text' | 'TextWithTimestamps' | 'JSON',
    speakers = true
) {
    return await fetch(
        `https://omny.fm/api/orgs/${orgId}/clips/${clipId}/transcript?format=${format}&speakers=${speakers}`
    ).then((res) => res.json());
}

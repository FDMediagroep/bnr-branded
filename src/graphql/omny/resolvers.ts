import { Program } from '../../utils/models';
import {
    getClipDetails,
    getClipDetailsExt,
    getClipTranscript,
    getPlaylistClips,
    getPlaylistDetails,
    getProgramClips,
    getProgramDetails,
    getProgramPlaylists,
    getPrograms,
} from '../../utils/omnyHelper';

async function ProgramsResolver(_, req) {
    return (await getPrograms(process.env.OMNY_ORGID))?.Programs ?? [];
}

async function ProgramResolver(_, req) {
    return await getProgramDetails(
        process.env.OMNY_ORGID,
        _?.ProgramId ?? req?.programId
    );
}

async function ProgramClipsResolver(_: Program, req) {
    return await getProgramClips(
        process.env.OMNY_ORGID,
        _?.Id ?? req?.programId,
        req?.cursor,
        req?.pageSize
    );
}

async function ProgramPlaylistResolver(_, req) {
    return await getProgramPlaylists(
        process.env.OMNY_ORGID,
        _?.Id ?? req?.programId
    );
}

async function PlaylistDetailsResolver(_, req) {
    return await getPlaylistDetails(process.env.OMNY_ORGID, req?.playlistId);
}

async function PlaylistClipsResolver(_, req) {
    return await getPlaylistClips(
        process.env.OMNY_ORGID,
        _?.Id ?? req?.playlistId,
        req?.cursor,
        req?.pageSize
    );
}

async function ClipResolver(_, req) {
    return await getClipDetails(process.env.OMNY_ORGID, req?.clipId);
}

async function ClipExternalResolver(_, req) {
    return await getClipDetailsExt(process.env.OMNY_ORGID, req?.externalId);
}

async function ClipTranscriptResolver(_, req) {
    return await getClipTranscript(
        process.env.OMNY_ORGID,
        req?.clipId,
        req?.format,
        req?.speakers
    );
}

export const OmnyQueryResolvers = {
    programs: ProgramsResolver,
    program: ProgramResolver,
    programClips: ProgramClipsResolver,
    playlists: ProgramPlaylistResolver,
    playlist: PlaylistDetailsResolver,
    playlistClips: PlaylistClipsResolver,
    clip: ClipResolver,
    clipExternal: ClipExternalResolver,
    clipTranscript: ClipTranscriptResolver,
};

/**
 * Here starts the N+1 problems for GraphQL.
 */
export const OmnyFieldResolvers = {
    /**
     * type `Program` special resolvers for
     * specific fields.
     */
    Program: {
        Clips: ProgramClipsResolver,
        Playlists: ProgramPlaylistResolver,
    },
    Clip: {
        Program: ProgramResolver,
    },
    Playlist: {
        Program: ProgramResolver,
        PlaylistClips: PlaylistClipsResolver,
    },
};

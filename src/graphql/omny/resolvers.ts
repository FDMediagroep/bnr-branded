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

async function programsResolver(_, req) {
    return (await getPrograms(process.env.OMNY_ORGID))?.Programs ?? [];
}

async function programResolver(_, req) {
    return await getProgramDetails(
        process.env.OMNY_ORGID,
        _?.ProgramId ?? req?.programId
    );
}

async function programClipsResolver(_: Program, req) {
    return await getProgramClips(
        process.env.OMNY_ORGID,
        _?.Id ?? req?.programId,
        req?.cursor,
        req?.pageSize
    );
}

async function programPlaylistResolver(_, req) {
    return await getProgramPlaylists(
        process.env.OMNY_ORGID,
        _?.Id ?? req?.programId
    );
}

async function playlistDetailsResolver(_, req) {
    return await getPlaylistDetails(process.env.OMNY_ORGID, req?.playlistId);
}

async function playlistClipsResolver(_, req) {
    return await getPlaylistClips(
        process.env.OMNY_ORGID,
        _?.Id ?? req?.playlistId,
        req?.cursor,
        req?.pageSize
    );
}

async function clipResolver(_, req) {
    return await getClipDetails(process.env.OMNY_ORGID, req?.clipId);
}

async function clipExternalResolver(_, req) {
    return await getClipDetailsExt(process.env.OMNY_ORGID, req?.externalId);
}

async function clipTranscriptResolver(_, req) {
    return await getClipTranscript(
        process.env.OMNY_ORGID,
        req?.clipId,
        req?.format,
        req?.speakers
    );
}

export const omnyResolvers = {
    Query: {
        programs: programsResolver,
        program: programResolver,
        programClips: programClipsResolver,
        playlists: programPlaylistResolver,
        playlist: playlistDetailsResolver,
        playlistClips: playlistClipsResolver,
        clip: clipResolver,
        clipExternal: clipExternalResolver,
        clipTranscript: clipTranscriptResolver,
    },
    Program: {
        Clips: programClipsResolver,
        Playlists: programPlaylistResolver,
    },
    Clip: {
        Program: programResolver,
    },
    Playlist: {
        Program: programResolver,
        PlaylistClips: playlistClipsResolver,
    },
};

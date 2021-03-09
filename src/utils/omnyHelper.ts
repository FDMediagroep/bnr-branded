type Cursor = {
    Cursor: number;
    TotalCount: number;
};

export type Program = {
    Id: string; // The ID of the program.
    Name: string; // The name of the program.
    Slug: string; // The URL slug of the program. The Omny.fm show page can be accessed in the format https://omny.fm/shows/{Slug}.
    Description: string; // The description of the program.
    DescriptionHtml: string;
    Author: string;
    Copyright: string;
    Publisher: string; // The publisher of the program.
    ArtworkUrl: string; // A publicly-accessible URL to the artwork image for this program. The size parameter specifies the image size (default size is medium). Valid size parameters are: thumbnail (64x64), small (256x256), medium (600x600) and large (3000x3000).
    Category: string; // The category of the program.
    Categories: string[];
    SocialWeb: string; // The web URL of the program.
    SocialTwitter: string; // The Twitter account username of the program (should be accessed in the format https://twitter.com/{SocialTwitter}).
    SocialFacebook: string; // The Facebook page username of the program (should be accessed in the format https://fb.com/{SocialFacebook}).
    Hidden: boolean; // If true, the program should be considered "private" and should not be shown in public directories or indexed. (Private programs are not available in the consumer API).
    Archived: boolean; // If true, the program should be considered an archive and will not be actively updated.
    Network: string; // The name of the network group of the program.
    NetworkId: string;
    ExternalId: string;
    ContactName: string;
    ContactEmail: string;
    DefaultPlaylistId: string;
};

export interface Programs {
    Programs: Program[];
}

type DirectoryLinks = {
    ApplePodcasts: string; // The Apple Podcasts directory URL.
    GooglePodcasts: string; // The Google Podcasts directory URL.
    Spotify: string; // The Spotify directory URL.
    Stitcher: string; // The Stitcher directory URL.
    TuneIn: string; // The TuneIn directory URL.
    GooglePlay: string; // (string, obsolete) The Google Play directory URL.
    RssFeed: string; // The RSS feed URL for this playlist.
};

export type Playlist = {
    Id: string; // The ID of the playlist.
    Title: string; // The name of the playlist.
    Description: string; // The description of the playlist.
    ProgramId: string; // The ID of the program to which the playlist belongs.
    RssFeedUrl: string; // The RSS feed URL for this playlist.
    EmbedUrl: string; // The embed player iframe URL for this playlist.
    ArtworkUrl: string; // A publicly-accessible URL to the artwork image for this playlist. The size parameter specifies the image size (default size is medium). Valid size parameters are: thumbnail (64x64), small (256x256), medium (600x600) and large (3000x3000).
    NumberOfClips: number; // The number of clips available in the playlist
    Visibility: string; // The visibility of the clip. Valid values are Public, Unlisted and Private.
    Categories: string[]; // The list of iTunes category names.
    DirectoryLinks: DirectoryLinks; // The podcast directory (Apple Podcasts, Google Podcasts, Spotify) URLs for this playlist.
};

interface Playlists extends Cursor {
    Playlists: Playlist[];
}

type ClipChapter = {
    Id: string; // The ID of the chapter.
    Name: string; // The name of the chapter.
    Position: string; // The timestamp of the chapter in hh:mm:ss.
};

type ClipMonetization = {
    PreRoll: string; // If pre-roll ad is enabled for this clip.
    PostRoll: string; // If post-roll ad is enabled for this clip.
    MidRolls: string[]; // (TimeSpan[]) An array of midroll locations. For example, a value of ["00:00:30", "01:23:45"] would represent a midroll at 30 seconds, and one at 1 hour, 23 minutes and 45 seconds into the episode.
};

type RecordingMetadata = {
    CaptureStartUtc: string; // The date and time the recording started capturing.
    CaptureEndUtc: string; // The date and time the recording finished capturing.
};

export type Clip = {
    Id: string;
    Title: string; // The title of the clip.
    Description: string; // The description of the clip (without any HTML formatting).
    DescriptionHtml: string; // The description of the clip (with HTML formatting).
    Tags: string[]; // An array of tags of the clips.
    Season: number; // An optional season number for the clip (as defined by Apple Podcasts).
    Episode: number; // An optional episode number for the clip (as defined by Apple Podcasts).
    EpisodeType: string; // The type of episode of the clip (as defined by Apple Podcasts). Valid values are Full, Trailer and Bonus.
    ImageUrl: string; // A publicly-accessible URL to the artwork image for this clip. The size parameter specifies the image size (default size is medium). Valid size parameters are: thumbnail (64x64), small (256x256), medium (600x600) and large (3000x3000).
    AudioUrl: string; // A publicly-accessible URL to the MP3 audio for this clip.
    VideoUrl: string; // If a visualized video has been generated, a publicly-accessible URL to the MP4 video for this clip.
    EmbedUrl: string; // The embed player iframe URL for this clip.
    DurationSeconds: number; // The time length of the clip in seconds.
    PublishState: string; // The publish state of the clip. Clips should have a state of Published.
    PublishedUrl: string; // A publicly-accessible URL for the clip's Omny.fm web player
    Visibility: string; // The visibility state of the clip. Valid visibilities are Public (should be publicly shown in directories and indexes), and Unlisted (should not be shown in directories and indexes).
    PublishedUtc: string; // The date and time when the clip was published.
    PlaylistIds: string[]; // An array of IDs for playlists to which the clip has been added.
    Chapters: ClipChapter[]; // An array of chapter objects added to the clip.
    State: string; // The state of the clip. Valid states are: Ready (the clip is ready to be played).
    ShareUrl: string; // An optional override for the share URL.
    ImportId: string; // An optional episode identifier if the clip was imported from another provider.
    Monetization: ClipMonetization; // Monetization settings for the clip.
    RecordingMetadata: RecordingMetadata; // Related information about the recording associated with the clip if made from a recording.
    ProgramId: string; // The ID of the program the to which the clip belongs.
    PublishedAudioSizeInBytes: number; // If the clip is published, the size of the audio file in bytes.
    ContentRating: string; // The content rating of the of the clip. Valid ratings are Unrated, Clean and Explicit.
    ExternalId: string; // The external ID of the clip.
};

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

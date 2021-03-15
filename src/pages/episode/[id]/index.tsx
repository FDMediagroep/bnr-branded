import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Clip } from '../../../components/clip/Clip';
import {
    getClipDetails,
    getProgramClips,
    getPrograms,
} from '../../../utils/omnyHelper';
import UserStore from '../../../stores/UserStore';

import { Clip as ClipType } from '../../../utils/models';

interface Props {
    clip: ClipType;
}

function Page(props: Props) {
    const episodePlaylist = (event) => {
        event.preventDefault();
        const userData = UserStore.getUserData();
        event.preventDefault();
        userData.data.episodes.push(props.clip);
        props.clip.DurationSeconds = props.clip.DurationSeconds * 1000;
    };

    return props.clip ? (
        <section className="default-content-body grid">
            <main className="xs-12 m-8">
                <Clip clip={props.clip} />
            </main>
            <aside className="xs-12 m-4">
                {UserStore.getUserData() ? (
                    <a onClick={episodePlaylist}>Voor later</a>
                ) : (
                    'Login of registreer om episodes later te beluisteren'
                )}
            </aside>
        </section>
    ) : null;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const programs = await getPrograms(process.env.OMNY_ORGID);
    const paths = [];
    programs.Programs.forEach((program) => {
        getProgramClips(process.env.OMNY_ORGID, program.Id).then((clips) => {
            paths.push({ params: { id: clips.Clips.map((clip) => clip.Id) } });
        });
    });
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const clip = await getClipDetails(
        process.env.OMNY_ORGID,
        params.id as string
    );

    return { props: { clip } };
};

export default Page;

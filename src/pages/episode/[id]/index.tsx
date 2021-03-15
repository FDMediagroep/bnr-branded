import React from 'react';
import { GetServerSideProps, GetStaticPaths } from 'next';
import { Clip } from '../../../components/clip/Clip';
import {
    getClipDetails,
    getProgramClips,
    getPrograms,
} from '../../../utils/omnyHelper';
import UserStore from '../../../stores/UserStore';

import { Clip as ClipType } from '../../../utils/models';
import { getSession, signIn } from 'next-auth/client';

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
                    <a onClick={() => signIn()}>
                        Login of registreer om episodes later te beluisteren
                    </a>
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

export const getServerSideProps: GetServerSideProps = async ({
    req,
    params,
}) => {
    const session = getSession({ req });
    const clip = await getClipDetails(
        process.env.OMNY_ORGID,
        params.id as string
    );

    return { props: { clip, session } };
};

export default Page;

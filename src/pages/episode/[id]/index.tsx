import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Clip } from '../../../components/clip/Clip';
import {
    Clip as ClipType,
    getClipDetails,
    getProgramClips,
    getPrograms,
} from '../../../utils/omnyHelper';

interface Props {
    clip: ClipType;
}

function Page(props: Props) {
    return props.clip ? (
        <section className="default-content-body grid">
            <main className="xs-12 m-9">
                <Clip clip={props.clip} />
            </main>
            <aside className="xs-12 m-3">ASIDE</aside>
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

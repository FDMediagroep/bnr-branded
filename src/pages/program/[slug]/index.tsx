import React, { useCallback, useEffect, useState } from 'react';
import '@fdmg/bnr-design-system/components/button/Button.css';
import { ButtonGhost } from '@fdmg/bnr-design-system/components/button/ButtonGhost';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import {
    Clips,
    getProgramClips,
    getProgramDetails,
    getPrograms,
    Program,
    Programs,
} from '../../../utils/omnyHelper';
import styles from './Program.module.scss';
import Link from 'next/link';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';
import { VerticalCard1 } from '@fdmg/bnr-design-system/components/card/VerticalCard1';
import PlayerStore from '../../../stores/PlayerStore';

interface Props {
    page?: number;
    programDetails: Program;
    programClips: Clips;
    Programs: Programs;
    [x: string]: any;
}

function Page(props: Props) {
    const [playingUrl, setPlayingUrl] = useState(null);

    useEffect(() => {
        const subId = PlayerStore.subscribe(() => {
            setPlayingUrl(PlayerStore.getAudioUrl());
        });
        setPlayingUrl(PlayerStore.getAudioUrl());
        return () => {
            PlayerStore.unsubscribe(subId);
        };
    }, []);

    const hasPrev = useCallback(() => {
        return props?.page > 1;
    }, [props?.page]);

    const hasNext = useCallback(() => {
        return props?.programClips?.Cursor > props?.page;
    }, [props?.programClips?.Cursor, props?.page]);

    function handleClick(clip, e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (PlayerStore.getAudioUrl() !== clip.EmbedUrl) {
            PlayerStore.setAudioUrl(clip.EmbedUrl);
        } else {
            PlayerStore.setAudioUrl(null);
        }
    }

    return (
        <section className={styles.program}>
            {props?.programDetails ? (
                <section className={styles.programDetail}>
                    {props?.programDetails?.ArtworkUrl ? (
                        <span className={styles.image}>
                            <Image
                                src={props?.programDetails?.ArtworkUrl}
                                layout={'responsive'}
                                width={1}
                                height={1}
                                objectFit={'cover'}
                            />
                        </span>
                    ) : null}
                    <section className={styles.textContent}>
                        {Object.keys(props?.programDetails).map((key) => {
                            switch (key) {
                                case 'DescriptionHtml':
                                    return (
                                        <div
                                            key={key}
                                            dangerouslySetInnerHTML={{
                                                __html: `${key}: ${props.programDetails.DescriptionHtml}`,
                                            }}
                                        />
                                    );
                                case 'ArtworkUrl':
                                    break;
                                default:
                                    return (
                                        <div key={key}>
                                            {key}: {props?.programDetails[key]}
                                        </div>
                                    );
                            }
                        })}
                    </section>
                </section>
            ) : null}

            {props?.programClips?.TotalCount ? (
                <>
                    <p>
                        {hasPrev() ? (
                            <Link
                                href={`/program/${props?.programDetails.Slug}/${
                                    props?.page - 1
                                }`}
                            >
                                <ButtonGhost>&lt;</ButtonGhost>
                            </Link>
                        ) : null}
                        {props?.programClips?.TotalCount > 10
                            ? `Page ${props?.page}`
                            : null}
                        {hasNext() ? (
                            <Link
                                href={`/program/${props?.programDetails.Slug}/${props?.programClips?.Cursor}`}
                            >
                                <ButtonGhost>&gt;</ButtonGhost>
                            </Link>
                        ) : null}
                    </p>
                    <section className="grid">
                        {props?.programClips?.Clips?.map?.((clip, idx) => {
                            const playing = playingUrl === clip.EmbedUrl;
                            console.log(playing);
                            return (
                                <VerticalCard1
                                    key={`${clip.Id}-${idx}`}
                                    className="fullHeight xs-12 s-6 m-4 l-3"
                                    date={clip.PublishState}
                                    duration={`${Math.ceil(
                                        clip.DurationSeconds / 60
                                    )}min.`}
                                    href={`/clip/${clip.Id}`}
                                    imageUrl={clip.ImageUrl}
                                    madePossibleBy="mij"
                                    madePossibleLink="https://bnr.nl"
                                    madePossibleByPrefix="Een podcast van"
                                    title={clip.Title}
                                    Link={Link}
                                    onButtonClick={handleClick.bind(null, clip)}
                                    isPlaying={playing}
                                    footerText={props?.programDetails?.Name}
                                    footerUrl={`/program/${props?.programDetails?.Slug}`}
                                />
                            );
                        })}
                    </section>
                </>
            ) : (
                <div>Geen clips</div>
            )}
        </section>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const programs = await getPrograms(process.env.OMNY_ORGID);
    const paths = programs.Programs.map((program) => {
        return { params: { slug: program.Slug } };
    });
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const page = (context.params.page as string) ?? '1';
    const programs = await getPrograms(process.env.OMNY_ORGID);
    const program = programs.Programs.find(
        (program) => program.Slug === context.params.slug
    );
    const programDetails = await getProgramDetails(
        process.env.OMNY_ORGID,
        program.Id
    );
    const programClips = await getProgramClips(
        process.env.OMNY_ORGID,
        program.Id,
        parseInt(page, 10)
    );

    return {
        props: {
            programDetails,
            programClips,
            Programs: programs,
            page,
        },
        revalidate: 10,
    };
};

export default Page;

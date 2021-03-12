import React, { useCallback, useEffect, useState } from 'react';
import '@fdmg/bnr-design-system/components/button/Button.css';
import { ButtonGhost } from '@fdmg/bnr-design-system/components/button/ButtonGhost';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { Clips, Program, Programs, Sponsor } from '../../../utils/models';
import {
    getProgramClips,
    getProgramDetails,
    getPrograms,
} from '../../../utils/omnyHelper';
import styles from './Program.module.scss';
import Link from 'next/link';
import '@fdmg/bnr-design-system/components/card/HorizontalCard1.css';
import { HorizontalCard1 } from '@fdmg/bnr-design-system/components/card/HorizontalCard1';
import PlayerStore from '../../../stores/PlayerStore';
import { SponsorTeaser } from '../../../components/sponsor/SponsorTeaser';
import { getProgramEnrichment } from '../../../utils/sanityHelper';

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
        <section className={`${styles.program} default-content-body`}>
            {props?.programDetails ? (
                <section
                    className={`${styles.programDetail} grid`}
                    style={{
                        backgroundColor:
                            props.programDetails?.Enrichment?.color,
                    }}
                >
                    {props?.programDetails?.ArtworkUrl ? (
                        <span className={`xs-3 hide-lt-s m-2`}>
                            <Image
                                src={props?.programDetails?.ArtworkUrl}
                                layout={'responsive'}
                                width={1}
                                height={1}
                                objectFit={'cover'}
                            />
                        </span>
                    ) : null}
                    <section className={`${styles.textContent} xs-12 s-9 m-10`}>
                        <h1 className={`${styles.header} heading sans l`}>
                            {props.programDetails.Name}
                        </h1>

                        <div
                            className={`${styles.introText} body-text sans s`}
                            dangerouslySetInnerHTML={{
                                __html: props.programDetails.DescriptionHtml,
                            }}
                        />

                        {props.programDetails?.Enrichment?.sponsors?.length ? (
                            <>
                                <div className="body-text sans s">
                                    Sponsoren
                                </div>
                                <div
                                    className={`${styles.sponsors} body-text sans s`}
                                >
                                    {props.programDetails?.Enrichment.sponsors.map(
                                        (sponsor) => (
                                            <SponsorTeaser
                                                key={sponsor.name}
                                                sponsor={sponsor}
                                                color={
                                                    props.programDetails
                                                        .Enrichment.color
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </>
                        ) : null}
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
                        <main className="xs-12 m-8">
                            {props?.programClips?.Clips?.map?.((clip, idx) => {
                                const playing = playingUrl === clip.EmbedUrl;
                                return (
                                    <HorizontalCard1
                                        key={`${clip.Id}-${idx}`}
                                        id={clip.Id}
                                        href={`/episode/${clip.Id}`}
                                        imageUrl={clip.ImageUrl}
                                        title={clip.Title}
                                        label={props?.programDetails.Category}
                                        Link={Link}
                                        onButtonClick={handleClick.bind(
                                            null,
                                            clip
                                        )}
                                        isPlaying={playing}
                                        time={`${Math.ceil(
                                            clip.DurationSeconds / 60
                                        )}min`}
                                    />
                                );
                            })}
                        </main>
                        <aside className="xs-12 m-4">ASIDE</aside>
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
        (p) => p.Slug === context.params.slug
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
    const programEnrichments = await getProgramEnrichment(program.Id);

    programDetails.Enrichment = programEnrichments?.[0] ?? null;

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

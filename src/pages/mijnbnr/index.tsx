import React from 'react';
import styles from './index.module.scss';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';
import '@fdmg/bnr-design-system/components/card/HorizontalCard1.css';
import { HorizontalCard1 } from '@fdmg/bnr-design-system/components/card/HorizontalCard1';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import UserStore from '../../stores/UserStore';
import PlayerStore from '../../stores/PlayerStore';

interface Props {}

function showMypage() {
    console.log('USERDATA: ', UserStore.getUserData());
    const podcasts = UserStore.getUserData()?.data?.podcasts;
    const episodes = UserStore.getUserData()?.data?.episodes;

    function handleClick(clip, e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (PlayerStore.getAudioUrl() !== clip.EmbedUrl) {
            PlayerStore.setAudioUrl(clip.EmbedUrl);
        } else {
            PlayerStore.setAudioUrl(null);
        }
    }
    return (
        <section className={`${styles.page} grid default-content-body`}>
            <main className="xs-12 m-8 l-9">
                <section>
                    <h1 className={`${styles.header} heading sans l`}>
                        Door mij gevolgd
                    </h1>
                </section>
                <section>
                    {podcasts.map((program) => {
                        return (
                            <HorizontalCard1
                                key={program.Id}
                                id={program.Id}
                                href={`/program/${program.Slug}`}
                                imageUrl={program.ArtworkUrl}
                                title={program.Name}
                                Link={Link}
                                intro={program.Description}
                            />
                        );
                    })}
                </section>
                <p></p>
                <section>
                    <h1 className={`${styles.header} heading sans l`}>
                        Nog door mij te beluisteren
                    </h1>
                </section>
                <section>
                    {episodes?.map?.((clip, idx) => {
                        return (
                            <HorizontalCard1
                                key={`${clip.Id}-${idx}`}
                                id={clip.Id}
                                href={`/episode/${clip.Id}`}
                                imageUrl={clip.ImageUrl}
                                title={clip.Title}
                                Link={Link}
                                onButtonClick={handleClick.bind(null, clip)}
                                isPlaying={false}
                                time={`${Math.ceil(
                                    clip.DurationSeconds / 60
                                )}min`}
                            />
                        );
                    })}
                </section>
            </main>
            <aside className="xs-12 m-4 l-3">
                <h1 className={`${styles.header} heading sans l`}>
                    {UserStore.getUserData()?.username}
                </h1>
                <p>email: {UserStore.getUserData()?.email}</p>
            </aside>
        </section>
    );
}

function showEmptyPage() {
    return (
        <section className={`${styles.page} grid default-content-body`}>
            <main className="xs-12 m-8 l-9">
                <section>
                    <h1 className={`${styles.header} heading sans l`}>
                        Wie is u?
                    </h1>
                </section>
            </main>
            <aside className="xs-12 m-4 l-3">
                <h1 className={`${styles.header} heading sans l`}></h1>
            </aside>
        </section>
    );
}
function Page() {
    const page =
        UserStore.getUserData() != null ? showMypage() : showEmptyPage();

    return page;
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
        revalidate: 10,
    };
};

export default Page;

import React from 'react';
import styles from './index.module.scss';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';
import '@fdmg/bnr-design-system/components/card/HorizontalCard1.css';
import { HorizontalCard1 } from '@fdmg/bnr-design-system/components/card/HorizontalCard1';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import UserStore from '../../stores/UserStore';
import PlayerStore from '../../stores/PlayerStore';
import '@fdmg/bnr-design-system/components/button/ButtonCta.css';
import { ButtonCta } from '@fdmg/bnr-design-system/components/button/ButtonCta';

function showMypage() {
    const [session, loading] = useSession();
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
                    {!loading && session && (
                        <ButtonCta onClick={() => signOut()}>
                            Sign Out
                        </ButtonCta>
                    )}
                </section>
                <section>
                    {podcasts?.map((program) => {
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
                <h1 className={`${styles.header} heading sans l`}>Profiel</h1>
                <p>email: {UserStore.getUserData()?.email}</p>
                <p>name: {UserStore.getUserData()?.name}</p>
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
                    <ButtonCta onClick={() => signIn('cognito')}>
                        Sign In
                    </ButtonCta>
                </section>
            </main>
            <aside className="xs-12 m-4 l-3">
                <h1 className={`${styles.header} heading sans l`}></h1>
            </aside>
        </section>
    );
}
function Page() {
    const [session, loading] = useSession();

    return (
        <>
            {!loading && !session && showEmptyPage()}
            {!loading && session && showMypage()}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });

    return {
        props: {
            session,
        },
    };
};

export default Page;

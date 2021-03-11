import React, { useEffect, useState } from 'react';
import PlayerStore from '../../stores/PlayerStore';
import { Clip as ClipType } from '../../utils/omnyHelper';
import styles from './Clip.module.scss';
import '@fdmg/bnr-design-system/components/button/ButtonPlay.css';
import { ButtonPlay } from '@fdmg/bnr-design-system/components/button/ButtonPlay';

interface Props {
    clip: ClipType;
    [x: string]: any;
}

function Clip(props: Props) {
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

    function handleClick() {
        if (playingUrl !== props.clip.EmbedUrl) {
            PlayerStore.setAudioUrl(props.clip.EmbedUrl);
        } else {
            PlayerStore.setAudioUrl(null);
        }
    }

    return (
        <article className={styles.clip}>
            <section className={styles.details}>
                <div className="grid">
                    <div className="xs-12 m-3">
                        <img src={props.clip.ImageUrl} />
                    </div>
                    <div className="xs-12 m-9">
                        <ButtonPlay
                            className={styles.playButton}
                            onClick={handleClick}
                            isPlaying={playingUrl === props.clip.EmbedUrl}
                        />
                    </div>
                </div>
                <section className={styles.textContent}>
                    <h1 className="heading sans l">{props.clip.Title}</h1>
                    <time>{props.clip.PublishedUtc}</time>
                    <p className="body-text sans s">
                        {props.clip.PublishedUrl}
                    </p>
                    <div
                        className="body-text sans s"
                        dangerouslySetInnerHTML={{
                            __html: props.clip.DescriptionHtml,
                        }}
                    />
                </section>
            </section>
        </article>
    );
}

export { Clip };

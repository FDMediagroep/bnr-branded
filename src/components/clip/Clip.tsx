import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PlayerStore from '../../stores/PlayerStore';
import { Clip as ClipType } from '../../utils/models';
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

    useEffect(() => {
        document.querySelector('.body-content').innerHTML = `${
            document.querySelector('.body-content').innerHTML
        } ${props.clip.DescriptionHtml}`;
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
                <section className={styles.textContent}>
                    <h1 className={`${styles.heading} heading sans l`}>
                        <ButtonPlay
                            className={styles.playButton}
                            onClick={handleClick}
                            isPlaying={playingUrl === props.clip.EmbedUrl}
                        />

                        {props.clip.Title}
                    </h1>
                    <div className="body-text sans xs">
                        {props.clip.DurationSeconds
                            ? `Luistertijd ${Math.ceil(
                                  props.clip.DurationSeconds / 60
                              )} min.`
                            : null}
                    </div>
                    {props.clip.PublishedUtc ? (
                        <div className="body-text sans xs">
                            Publicatie datum:{' '}
                            {new Date(
                                props.clip.PublishedUtc
                            ).toLocaleDateString()}
                        </div>
                    ) : null}

                    <div className="body-text sans s body-content">
                        <img
                            className={styles.image}
                            src={props.clip.ImageUrl}
                        />
                    </div>
                </section>
            </section>
        </article>
    );
}

export { Clip };

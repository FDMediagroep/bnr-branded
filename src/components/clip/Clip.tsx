import React from 'react';
import PlayerStore from '../../stores/PlayerStore';
import { Clip as ClipType } from '../../utils/omnyHelper';
import styles from './Clip.module.scss';

interface Props {
    clip: ClipType;
    [x: string]: any;
}

function Clip(props: Props) {
    function handleClick() {
        PlayerStore.setAudioUrl(props.clip.EmbedUrl);
    }

    return (
        <article className={styles.clip}>
            <section className={styles.details}>
                <img src={props.clip.ImageUrl} />
                <section className={styles.textContent}>
                    <h1>{props.clip.Title}</h1>
                    <time>{props.clip.PublishedUtc}</time>
                    <p>{props.clip.PublishedUrl}</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: props.clip.DescriptionHtml,
                        }}
                    />
                </section>
            </section>
            <button onClick={handleClick}>Play</button>
        </article>
    );
}

export { Clip };

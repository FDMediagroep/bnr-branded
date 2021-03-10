import React, { useEffect, useRef, useState } from 'react';
import PlayerStore from '../../stores/PlayerStore';
import styles from './Player.module.scss';

interface Props {
    url?: string;
}

function Player(props: Props) {
    const iframeRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(props.url);
    const [audioPlayer, setAudioPlayer] = useState(null);

    useEffect(() => {
        import('player.js').then(({ default: playerjs }) => {
            setAudioPlayer(playerjs);
        });
    }, []);

    useEffect(() => {
        if (iframeRef.current && audioPlayer) {
            const player = new audioPlayer.Player(iframeRef.current);
            player.on('ready', () => player.play());
            player.on('pause', () => {
                PlayerStore.setAudioUrl(null);
            });
        }
    }, [audioUrl, iframeRef, audioPlayer]);

    useEffect(() => {
        const subId = PlayerStore.subscribe(() => {
            setAudioUrl(PlayerStore.getAudioUrl());
        });
        return () => {
            PlayerStore.unsubscribe(subId);
        };
    }, []);

    return audioUrl ? (
        <iframe
            ref={iframeRef}
            className={styles.player}
            src={audioUrl}
            allow="autoplay"
        />
    ) : null;
}

export { Player };

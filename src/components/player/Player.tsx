import { useEffect, useState } from 'react';
import PlayerStore from '../../stores/PlayerStore';
import styles from './Player.module.scss';

interface Props {
    url?: string;
    [x: string]: any;
}

function Player(props: Props) {
    const [audioUrl, setAudioUrl] = useState(props.url);
    const [audioPlayer, setAudioPlayer] = useState(null);

    useEffect(() => {
        import('player.js').then(({ default: playerjs }) => {
            setAudioPlayer(playerjs);
        });
    }, []);

    useEffect(() => {
        if (audioUrl && audioPlayer) {
            // Remove existing player(s) iframe
            [].slice
                .call(document.querySelectorAll('.omny-player'))
                .forEach((iframePlayer: HTMLElement) => {
                    iframePlayer?.parentNode.removeChild(iframePlayer);
                });
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', audioUrl);
            iframe.setAttribute('allow', 'autoplay');
            iframe.setAttribute('class', `${styles.player} omny-player`);
            document.documentElement.appendChild(iframe);

            const player = new audioPlayer.Player(iframe);
            player.on('ready', () => player.play());
            player.on('pause', () => {
                PlayerStore.setAudioUrl(null);
            });
            player.on('ended', () => {
                PlayerStore.setAudioUrl(null);
            });
            player.on('error', () => {
                PlayerStore.setAudioUrl(null);
            });
        } else {
            const playerIframe = document.querySelector('.omny-player');
            if (playerIframe) {
                const player = new audioPlayer.Player(playerIframe);
                player?.pause();
            }
        }
    }, [audioUrl, audioPlayer]);

    useEffect(() => {
        if (!audioUrl) {
            // Remove existing player(s) iframe
            [].slice
                .call(document.querySelectorAll('.omny-player'))
                .forEach((iframePlayer: HTMLElement) => {
                    iframePlayer?.parentNode.removeChild(iframePlayer);
                });
        }
    }, [audioUrl]);

    useEffect(() => {
        const subId = PlayerStore.subscribe(() => {
            setAudioUrl(PlayerStore.getAudioUrl());
        });
        return () => {
            PlayerStore.unsubscribe(subId);
        };
    }, []);

    return null;
}

export { Player };

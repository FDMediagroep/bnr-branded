import React from 'react';
import styles from './SponsorTeaser.module.scss';
import '@fdmg/bnr-design-system/components/button/ButtonPlay.css';
import { Sponsor } from '../../utils/models';
import Image from 'next/image';

interface Props {
    sponsor: Sponsor;
    color: string;
    [x: string]: any;
}

function SponsorTeaser(props: Props) {
    console.log('SPONSOR: ', props);
    return (
        <>
            <div className={styles.sponsor}>
                {props.sponsor.name}
                <Image
                    src={props.sponsor.logo}
                    layout={'responsive'}
                    width={1}
                    height={1}
                    objectFit={'cover'}
                />
            </div>
            <style jsx={true}>{`
                div {
                    border-color: ${props.color ?? '#ffd200'};
                }
            `}</style>
        </>
    );
}

export { SponsorTeaser };

import React from 'react';
import styles from './SponsorTeaser.module.scss';
import '@fdmg/bnr-design-system/components/button/ButtonPlay.css';
import { Sponsor } from '../../utils/models';
import Image from 'next/image';

interface Props {
    sponsor: Sponsor;
    [x: string]: any;
}

function SponsorTeaser(props: Props) {
    return (
        <div className={styles.sponsor}>
            <Image
                src={props.sponsor.logo}
                layout={'responsive'}
                width={1}
                height={1}
                objectFit={'cover'}
            />
            <div>{props.sponsor.name}</div>
        </div>
    );
}

export { SponsorTeaser };

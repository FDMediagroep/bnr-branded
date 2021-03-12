import '@fdmg/bnr-design-system/components/button/ButtonGhost.css';
import { ButtonGhost } from '@fdmg/bnr-design-system/components/button/ButtonGhost';
import React from 'react';
import styles from './Pagination.module.scss';
import Link from 'next/link';

interface Props {
    hasPrev?: boolean;
    hasNext?: boolean;
    nextUrl?: string;
    prevUrl?: string;
}

function Pagination(props: Props) {
    return (
        <section className={styles.pagination}>
            <Link href={props.prevUrl}>
                <ButtonGhost disabled={!props.hasPrev}>&lt;</ButtonGhost>
            </Link>
            <Link href={props.nextUrl}>
                <ButtonGhost disabled={!props.hasNext}>&gt;</ButtonGhost>
            </Link>
        </section>
    );
}

export { Pagination };

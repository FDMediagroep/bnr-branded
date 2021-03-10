import React from 'react';
import Link from 'next/link';
import { Programs } from '../../utils/omnyHelper';
import styles from './Menu.module.scss';

interface Props {
    Programs: Programs;
}
function Menu(props: Props) {
    return (
        <nav className={styles.menu}>
            {props?.Programs?.Programs?.map?.((item) => {
                return (
                    <Link key={item.Id} href={`/program/${item.Slug}`}>
                        <a>{item.Name}</a>
                    </Link>
                );
            })}
        </nav>
    );
}

export { Menu };

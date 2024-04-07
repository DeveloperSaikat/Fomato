'use client';

import Link from 'next/link';
import Image from 'next/image';
import classes from './main-header.module.css';

import logoimage from '@/assets/logo.png'; // This return an object inside which we have src for the path of the image
import { usePathname } from 'next/navigation';

export default function MainHeader() {
    const path = usePathname(); // This is the hook that is responsible for pulling the path after domain name

    return <header className={classes.header}>
        <Link className={classes.logo} href='/'>
            <Image src={logoimage} alt='A plate with a food on it' priority/>
            Fomato
        </Link>

        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link href='/meals' className={path.startsWith('/meals') ? classes.active : undefined}>Browse meals</Link>
                </li>
                <li>
                    <Link href='/community'  className={path === '/community' ? classes.active : undefined}>Foodies community</Link>
                </li>
            </ul>
        </nav>
    </header>
}
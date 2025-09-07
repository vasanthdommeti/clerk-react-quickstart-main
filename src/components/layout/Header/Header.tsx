import React, { useState } from 'react';
import styles from './header.module.css';
import { NavLink } from './NavLink';
import { useScrollHide } from '../../../hooks/useScrollHide';
import { MobileMenu } from './MobileMenu';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { UserMenu } from './UserMenu';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    const { hidden, atTop } = useScrollHide({ threshold: 8, downDelay: 40 });
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <header
                className={[
                    styles.header,
                    hidden ? styles.headerHidden : '',
                    atTop ? styles.headerAtTop : styles.headerScrolled
                ].join(' ')}
            >
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <Link to="/" className={styles.logo}>
                            <span className={styles.logoMark}>RSU</span>
                            <span className={styles.logoText}>Tracker</span>
                        </Link>
                    </div>

                    <nav className={styles.centerNav} aria-label="Main navigation">
                        <NavLink to="/" label="Home" />
                        <NavLink to="/trade" label="Trade" />
                        <NavLink to="/rsu" label="RSU" />
                    </nav>

                    <div className={styles.right}>
                        <SignedOut>
                            <div className={styles.authButtons}>
                                <SignInButton mode="modal">
                                    <button className={styles.buttonText}>Log In</button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className={styles.buttonPrimary}>Sign Up</button>
                                </SignUpButton>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserMenu />
                        </SignedIn>
                        <button
                            className={styles.hamburger}
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen(o => !o)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>
            <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className={styles.offset} /> {/* To avoid content jump */}
        </>
    );
};
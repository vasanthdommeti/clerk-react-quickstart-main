import React, { useEffect } from 'react';
import styles from './header.module.css';
import { NavLink } from './NavLink';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { UserMenu } from './UserMenu';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const MobileMenu: React.FC<Props> = ({ open, onClose }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.removeProperty('overflow');
        }
        return () => document.body.style.removeProperty('overflow');
    }, [open]);

    return (
        <div
            className={`${styles.mobileMenuWrapper} ${open ? styles.mobileMenuOpen : ''}`}
            aria-hidden={!open}
        >
            <div className={styles.mobileMenuInner}>
                <nav className={styles.mobileNav}>
                    <NavLink to="/" label="Home" onClick={onClose} />
                    <NavLink to="/trade" label="Trade" onClick={onClose} />
                    <NavLink to="/rsu" label="RSU" onClick={onClose} />
                </nav>
                <div className={styles.mobileAuth}>
                    <SignedOut>
                        <div className={styles.authButtonsStack}>
                            <SignInButton mode="modal">
                                <button className={styles.buttonPrimary}>Log In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className={styles.buttonSecondary}>Sign Up</button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserMenu mobile onNavigate={onClose} />
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};
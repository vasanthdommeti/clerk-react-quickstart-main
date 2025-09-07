import React, { useState, useRef, useEffect } from 'react';
import styles from './header.module.css';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    mobile?: boolean;
    onNavigate?: () => void;
}

export const UserMenu: React.FC<Props> = ({ mobile = false, onNavigate }) => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (!mobile) {
            document.addEventListener('mousedown', handler);
        }
        return () => document.removeEventListener('mousedown', handler);
    }, [mobile]);

    const menuItems = [
        { label: 'Wallet', path: '/wallet' },
        { label: 'Personal Info', path: '/profile' },
        { label: 'Transactions', path: '/transactions' }
    ];

    const handleNavigate = (path: string) => {
        navigate(path);
        onNavigate?.();
        setOpen(false);
    };

    return (
        <div
            className={mobile ? styles.userMenuMobile : styles.userMenu}
            ref={ref}
            onMouseEnter={() => !mobile && setOpen(true)}
            onMouseLeave={() => !mobile && setOpen(false)}
        >
            <button
                className={styles.userButton}
                onClick={() => mobile && setOpen(o => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <img
                    src={user?.imageUrl}
                    alt={user?.fullName || 'User'}
                    className={styles.userAvatar}
                />
                <span className={styles.userName}>
                    {user?.firstName || 'User'}
                </span>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
                >
                    <path
                        d="M5 7l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {open && (
                <div className={mobile ? styles.dropdownMobile : styles.dropdown} role="menu">
                    <div className={styles.dropdownHeader}>
                        <div className={styles.dropdownIdentity}>
                            <img
                                src={user?.imageUrl}
                                alt="avatar"
                                className={styles.dropdownAvatar}
                            />
                            <div>
                                <div className={styles.dropdownName}>{user?.fullName}</div>
                                <div className={styles.dropdownEmail}>
                                    {user?.primaryEmailAddress?.emailAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className={styles.dropdownList}>
                        {menuItems.map(item => (
                            <li key={item.path}>
                                <button
                                    className={styles.dropdownItem}
                                    onClick={() => handleNavigate(item.path)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.dropdownFooter}>
                        <button
                            className={styles.logoutButton}
                            onClick={() => {
                                signOut();
                                onNavigate?.();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
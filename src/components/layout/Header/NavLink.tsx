import React from 'react';
import styles from './header.module.css';
import { NavLink as RRDNavLink } from 'react-router-dom';

interface Props {
    to: string;
    label: string;
    onClick?: () => void;
}

export const NavLink: React.FC<Props> = ({ to, label, onClick }) => {
    return (
        <RRDNavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                [
                    styles.navLink,
                    isActive ? styles.navLinkActive : undefined
                ]
                    .filter(Boolean)
                    .join(' ')
            }
        >
            {label}
        </RRDNavLink>
    );
};
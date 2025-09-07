import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header/Header';

const Home = () => <div style={{ padding: '2rem', color: '#e2e8f0' }}><h1>Home</h1></div>;
const Trade = () => <div style={{ padding: '2rem', color: '#e2e8f0' }}><h1>Trade</h1></div>;
const RSU = () => <div style={{ padding: '2rem', color: '#e2e8f0' }}><h1>RSU</h1></div>;
const Wallet = () => <div style={{ padding: '2rem', color: '#e2e8f0' }}><h1>Wallet</h1></div>;
const Profile = () => <div style={{ padding: '2rem', color: '#e2e8f0' }}><h1>Profile</h1></div>;
const Transactions = () => <div style={{ padding: '2rem', color: '#e2e8f0' }}><h1>Transactions</h1></div>;

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/rsu" element={<RSU />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </>
  );
};
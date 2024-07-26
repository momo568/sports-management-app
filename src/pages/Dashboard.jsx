/* eslint-disable no-unused-vars */
// Dashboard.jsx
import React, { useState } from "react";
import StatisticsChart from "./StatisticsChart";
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [showStats, setShowStats] = useState(false);

  const handleCardClick = () => {
    setShowStats(true);
  };

  return (
    <div className={styles.dashboard}>
      <h1>Welcome</h1>
      {showStats && <StatisticsChart />}
      <div className={styles.cards}>
        <div className={styles.card} onClick={handleCardClick}>
          <h2>Clients Management</h2>
          <p>Manage all your clients information and relationships.</p>
        </div>
        <div className={styles.card} onClick={handleCardClick}>
          <h2>Offres Management</h2>
          <p>Create, edit, and manage subscription offers.</p>
        </div>
        <div className={styles.card} onClick={handleCardClick}>
          <h2>Payments Management</h2>
          <p>Track and process client payments efficiently.</p>
        </div>
      
      </div>
    </div>
  );
};

export default Dashboard;


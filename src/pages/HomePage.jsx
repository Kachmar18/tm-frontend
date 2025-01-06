import "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <h1 className={styles.companyName}>TrackMovies</h1>
      </header>
      <main className={styles.mainContent}>
        <button className={styles.centerButton} onClick={handleButtonClick}>
          Увійти в систему
          </button>
      </main>
    </div>
  );
};


export default HomePage;

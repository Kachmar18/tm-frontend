import "react";
import PropTypes from "prop-types";
import styles from "../styles/DashboardPage.module.css";
import userIcon from "../assets/img/user_icon.png";

const Sidebar = ({ isMenuOpen, toggleMenu, user, handleLogout }) => (
  <aside className={`${styles.sidebar} ${isMenuOpen ? styles.open : ""}`}>
    <button className={styles.closeButton} onClick={toggleMenu}>
      ✕
    </button>
    <nav>
      {user ? (
        <div className={styles.userInfo}>
          <img className={styles.userImage} src={userIcon} alt="User" />
          <p className={styles.userName}>{user.username}</p>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      ) : (
        <p>Please log in</p>
      )}
      <ul>
        <li>
          <a href="#">My Reviews</a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </aside>
);

Sidebar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired, // Булеве значення для відкриття/закриття меню
  toggleMenu: PropTypes.func.isRequired, // Функція для перемикання меню
  user: PropTypes.shape({
    username: PropTypes.string.isRequired, // Рядок: ім'я користувача
    email: PropTypes.string.isRequired, // Рядок: email користувача
  }), // User може бути null (необов'язковий пропс)
  handleLogout: PropTypes.func.isRequired, // Функція для виходу
};

export default Sidebar;

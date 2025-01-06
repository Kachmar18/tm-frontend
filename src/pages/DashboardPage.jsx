import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DashboardPage.module.css";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";

const DashboardPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) {
      alert("Please fill in all fields");
      return;
    }
    console.log("New Post:", newPost);
    setNewPost({ title: "", content: "" });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <header className={styles.header}>
        <div className={styles.companyName}>TrackMovies</div>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰
        </button>
      </header>

      <Sidebar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        user={user}
        handleLogout={handleLogout}
      />

      <main className={styles.mainContent}>
        <h1>Welcome to your Dashboard</h1>
        <button
          className={styles.addPostButton}
          onClick={() => setIsModalOpen(true)}
        >
          Додати допис
        </button>
      </main>
      <Modal
        isOpen={isModalOpen}
        newPost={newPost}
        onChange={setNewPost}
        onSave={handleAddPost}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;

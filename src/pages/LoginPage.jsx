import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../styles/LoginRegisterPage.module.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
  
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.username || !formData.password) {
        alert("Both fields are required.");
        return;
      }
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', formData);
        alert('Вхід успішний!');
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      } catch (error) {
        alert(error.response?.data || 'Помилка входу');
      }
    };
    
  
    return (
      <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Вхід у систему</h2>
        <p className={styles.explanation}>
          Введіть ваші дані для входу у систему.
        </p>
    
        {/* Форма для входу */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="text"
            name="username"
            placeholder="Логін"
            value={formData.username}
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
          />
          <button type="submit" className={styles.loginButton}>
            Увійти
          </button>
        </form>
    
        <p className={styles.registerLink}>
          Ще не маєте акаунта? <Link to="/register">Зареєструйтесь</Link>
        </p>
      </div>
    </div>
    
      );
    };
    
export default LoginPage;
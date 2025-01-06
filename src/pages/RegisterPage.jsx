import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/LoginRegisterPage.module.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
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
        try {
          const response = await axios.post('http://localhost:8080/api/auth/register', formData);
          alert('Registration successful!');
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/dashboard');
        } catch (error) {
          alert(error.response?.data || 'Registration error');
        }
      };

    return (
        <div className={styles.registerPage}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Реєстрація</h2>
                <p className={styles.explanation}>
                    Заповніть форму для створення облікового запису.
                </p>

                {/* Форма реєстрації */}
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Ім'я користувача"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.inputField}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Електронна пошта"
                        value={formData.email}
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
                    <button type="submit" className={styles.registerButton}>
                        Зареєструватись
                    </button>
                </form>

                <p className={styles.loginLink}>
                    Вже маєте акаунт? <Link to="/login">Увійдіть</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

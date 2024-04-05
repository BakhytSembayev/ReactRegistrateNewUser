import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const submitButtonRef = useRef(null);

  const validate = useCallback(() => {
    let isValid = true;
    const newErrors = {};

    if (!user.email) {
      newErrors.email = "Электронная почта обязательна к заполнению.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Неверный формат электронной почты.";
      isValid = false;
    }

    if (!user.password) {
      newErrors.password = "Пароль обязателен к заполнению.";
      isValid = false;
    } else if (user.password.length < 6 || user.password.length > 15) {
      newErrors.password = "Пароль должен содержать от 6 до 15 символов.";
      isValid = false;
    }

    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают.";
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
  }, [user.email, user.password, user.confirmPassword]);

  useEffect(() => {
    validate();
  }, [validate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    console.log("Регистрационные данные:", user);
    alert("Регистрация успешно завершена!");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Форма регистрации</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>
              Электронная почта:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </label>
          </div>
          <div className="password-input">
            <label>
              Пароль:
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </label>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="password-input">
            <label>
              Повтор пароля:
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </label>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" disabled={!isFormValid} ref={submitButtonRef}>Зарегистрироваться</button>
        </form>
      </header>
    </div>
  );
}

export default App;




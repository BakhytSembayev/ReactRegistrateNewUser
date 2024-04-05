import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './App.css';

const schema = yup.object({
  email: yup.string().required("Электронная почта обязательна к заполнению.").email("Неверный формат электронной почты."),
  password: yup.string().required("Пароль обязателен к заполнению.").min(6, "Пароль должен содержать от 6 до 15 символов.").max(15, "Пароль должен содержать от 6 до 15 символов."),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Пароли не совпадают.").required("Подтверждение пароля обязательно.")
}).required();

function App() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange" 
  });

  const onSubmit = data => {
    console.log(data);
    alert("Регистрация успешно завершена!");
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Форма регистрации</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label>
              Электронная почта:
              <input type="email" {...register("email")} />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </label>
          </div>
          <div>
            <label>
              Пароль:
              <input type={showPassword ? "text" : "password"} {...register("password")} />
              <button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Скрыть" : "Показать"}</button>
              {errors.password && <p className="error">{errors.password.message}</p>}
            </label>
          </div>
          <div>
            <label>
              Повтор пароля:
              <input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
            </label>
          </div>
          <button type="submit" disabled={!isValid}>Зарегистрироваться</button>
        </form>
      </header>
    </div>
  );
}

export default App;






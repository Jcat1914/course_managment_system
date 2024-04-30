import React, { useState } from "react";
import { KeiserLogo } from "../../component/index.js";
import styles from "./login.module.css";
import { login } from "../../services/authService.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes.js";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      const response = await login(username, password);
      console.log(response);
      setUser(response.user);
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className={styles.loginContainer}>
        <h1>Welcome to The Keiser Course Management System</h1>
        <KeiserLogo />
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label>Email:</label>
            <input type="text" {...register("username", { required: true })} />
            {errors.username && <p className={styles.errorMessage}>Email is required</p>}
          </div>
          <div className={styles.inputBox}>
            <label>Password:</label>
            <input type="password" {...register("password", { required: true })} />
            {errors.password && <p className={styles.errorMessage}>Password is required</p>}
          </div>
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </section>
    </>
  );
};

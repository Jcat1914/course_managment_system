import React from "react";
import { KeiserLogo } from "../../component/index.js";
import styles from "./login.module.css";
const Login = () => {
	return (
		<>
			<section className={styles.loginContainer}>
				<h1>Welcome to The Keiser Course Management System</h1>
				<KeiserLogo />
				<form className={styles.loginForm}>
					<div className={styles.inputBox}>
						<label>Email:</label>
						<input type="text" name="username" />
					</div>
					<div className={styles.inputBox}>
						<label>Password:</label>
						<input type="password" name="password" />
					</div>
					<button className={styles.loginButton} type="submit">
						Login
					</button>
				</form>
			</section>
		</>
	);
};

export default Login;

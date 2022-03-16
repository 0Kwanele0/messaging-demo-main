import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./pageStyles/register.module.scss";

function Register() {
  const [error, setError] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function submitData(data) {
    fetch("http://localhost:3001/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (data) => {
        if (data.status === 200) {
          const result = await data.json();
          console.log(result);
          localStorage.setItem("userId", result.user.id);
          localStorage.setItem("userName", result.user.name);
          localStorage.setItem("x-auth-token", result.token);
          window.location.replace("/");
        } else {
          const result = await data.json();
          setError(result.error);
        }
      })
      .catch((error) => console.log(error));
  }

  function reDirect(e) {
    e.preventDefault();
    window.location.replace("/login");
  }

  return (
    <div className={styles.container}>
      <h3>Welcome!</h3>
      <form
        onSubmit={handleSubmit(submitData)}
        className={styles.form}
        action="submit"
      >
        <input
          name="fullname"
          placeholder="Fullname"
          className={styles.input}
          type="text"
          {...register("fullname", { required: true })}
        />
        <span>
          {errors.fullname?.type === "required" && "Fullname is required"}
        </span>
        <input
          name="username"
          placeholder="Username"
          className={styles.input}
          type="text"
          {...register("username", { required: true })}
        />
        <span>
          {errors.username?.type === "required" && "Username is required"}
        </span>
        <input
          name="password"
          placeholder="Password"
          className={styles.input}
          type="text"
          {...register("password", { required: true })}
        />
        <span>
          {errors.password?.type === "required" && "Password is required"}
        </span>
        {error && (
          <p>
            <span>{error}</span>
          </p>
        )}
        <button className={styles.button} type="submit">
          Register
        </button>
      </form>
      <p className={styles.redirect} onClick={reDirect}>
        Login here!
      </p>
    </div>
  );
}

export default Register;

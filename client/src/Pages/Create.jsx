import { useForm } from "react-hook-form";
import styles from "./pageStyles/create.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function postData(data) {
    let userName = localStorage.getItem("userName");
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("x-auth-token");
    data.authorName = userName;
    data.userId = userId;
    data.downloads = 0;
    data.likes = 0;
    fetch("http://localhost:3001/api/data/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(data),
    })
      .then(async (data) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [name, setname] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    async function getName() {
      const theName = await localStorage.getItem("x-auth-token");
      if (theName) {
        setname(true);
      } else {
        navigate("/login");
      }
    }
    getName();
  }, [navigate]);

  return (
    <div>
      {name && (
        <div className={styles.container}>
          <form action="submit" onSubmit={handleSubmit(postData)}>
            {/* <input {...register("document", { required: false })} type="file" /> */}
            <input
              {...register("title", { required: true, max: 30 })}
              placeholder="Document title"
              type="text"
            />
            {errors.title?.type === "required" && (
              <p className={styles.error}>Title is required</p>
            )}
            <textarea
              {...register("description", { required: true, max: 40 })}
              placeholder="Description"
              rows={5}
              type="text"
            />
            {errors.description?.type === "required" && (
              <p className={styles.error}>
                Please provide document description.
              </p>
            )}
            {errors.description?.type === "max" && (
              <p className={styles.error}>
                Description must be less than 40 chars
              </p>
            )}
            <button type="submit">Post Document</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Create;

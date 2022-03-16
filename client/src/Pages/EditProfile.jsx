import { useForm } from "react-hook-form";
import styles from "./pageStyles/create.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [bio, setBio] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function postData(data) {
    console.log("Form submit:", data);
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("x-auth-token");
    const url =
      "http://localhost:3001/api/user/" + userId.replace(/['']+/g, "");
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(data),
    })
      .then(async (data) => {
        const mdata = await data.json();
        console.log("Database res:", mdata);
        navigate("/profile");
      })
      .catch((err) => console.log("Server err:", err));
  }

  const [name, setname] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    async function getName() {
      const theName = await localStorage.getItem("x-auth-token");
      const id = await localStorage.getItem("userId");
      if (theName) {
        setname(true);
        const url =
          "http://localhost:3001/api/user/" + id.replace(/['']+/g, "");
        fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "x-auth-token": theName,
          },
        })
          .then(async (data) => {
            const results = await data.json();
            console.log(results);
            setUserData(results);
            setFullname(results.fullname);
            setUserName(results.username);
            if (results.bio) {
              setBio(results.bio);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        navigate("/login");
      }
    }
    getName();
  }, [name, navigate]);

  return (
    <div>
      {name && (
        <div className={styles.container}>
          <form action="submit" onSubmit={handleSubmit(postData)}>
            {/* <input {...register("document", { required: false })} type="file" /> */}
            <input
              defaultValue={fullname}
              {...register("fullname", { required: true, max: 30 })}
              placeholder={userName}
              type="text"
            />
            {errors.title?.type === "required" && (
              <p className={styles.error}>Title is required</p>
            )}
            <textarea
              {...register("bio", { required: true, max: 40 })}
              defaultValue={bio ? bio : "Write your bio"}
              placeholder={bio ? bio : "Write your bio"}
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
            <button type="save">Post Document</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Create;

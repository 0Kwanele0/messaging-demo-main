import PrivatePostCard from "../components/PrivatePostCard";
import styles from "./pageStyles/profile.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [data, setData] = useState();
  const [posts, setPosts] = useState();
  const [papers, setPapers] = useState(0);
  let navigate = useNavigate();

  function edituser() {
    navigate("/edit");
  }

  function deleteUser() {
    const id = localStorage.getItem("userId");
    const url = "http://localhost:3001/api/user/" + id.replace(/['']+/g, "");
    const token = localStorage.getItem("x-auth-token");
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-auth-token": token,
      },
    }).then(() => {
      localStorage.removeItem("x-auth-token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      window.location.reload();
    });
  }

  useEffect(() => {
    const getName = async () => {
      const token = await localStorage.getItem("x-auth-token");
      if (token) {
        const id = await localStorage.getItem("userId");
        const url =
          "http://localhost:3001/api/user/" + id.replace(/['']+/g, "");
        const urlForData =
          "http://localhost:3001/api/data/" + id.replace(/['']+/g, "");

        await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "x-auth-token": token,
          },
        })
          .then(async (mydata) => {
            const result = await mydata.json();
            setData(result);
          })
          .catch((err) => console.log(err));

        fetch(urlForData, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "x-auth-token": token,
          },
        })
          .then(async (data) => {
            const docs = await data.json();
            setPosts(docs);
            setPapers(docs.length);
          })
          .catch((err) => console.log(err));
      } else {
        navigate("/login");
      }
    };
    getName();
  }, [navigate]);

  return (
    <div>
      {data && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Link to="/create">
              <div className={styles.createBtn}>
                <img
                  alt="create post"
                  src="https://img.icons8.com/ios-glyphs/30/ffffff/plus-math.png"
                />
              </div>
            </Link>
            <div className={styles.edit}>
              <div onClick={edituser} className={styles.each}>
                <p>Edit profile</p>
                <img
                  alt="pen"
                  src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
                />
              </div>
              <div onClick={deleteUser} className={styles.each}>
                <p>Delete profile</p>
                <img
                  alt="trash"
                  src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png"
                />
              </div>
            </div>
            <div className={styles.hisImage}></div>
            <h2>{data.fullname}</h2>
            {/* <p>{data.bio.length > 1 ? data.bio : "your bio here"}</p> */}
            <div className={styles.stats}>
              <p>{data.followers.length} Followers</p>
              <p>98 Following</p>
              <p>{papers} Papers</p>
            </div>
          </div>
          {posts &&
            posts.map((item, key) => {
              return (
                <PrivatePostCard
                  title={item.title}
                  note={item.description}
                  likes={item.likes}
                  downloads={item.downloads}
                  date={item.createdAt}
                  id={item._id}
                  key={key}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Profile;

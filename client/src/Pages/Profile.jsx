import PrivatePostCard from "../components/PrivatePostCard";
import styles from "./pageStyles/profile.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthorCard from "../components/AuthorCard";
import query from "../modules/query";

function Profile() {
  const [feed, setFeed] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [data, setData] = useState();
  const [posts, setPosts] = useState();
  const [papers, setPapers] = useState(0);
  let navigate = useNavigate();

  function viewFollowers() {
    setFollowers(true);
    setFeed(false);
    setFollowing(false);
  }
  function viewFollowing() {
    setFollowers(false);
    setFeed(false);
    setFollowing(true);
  }
  function viewFeed() {
    setFollowers(false);
    setFeed(true);
    setFollowing(false);
  }

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
  const id = localStorage.getItem("userId");
  const url = "http://localhost:3001/api/user/" + id.replace(/['']+/g, "");
  const urlForData =
    "http://localhost:3001/api/data/" + id.replace(/['']+/g, "");
  const token = localStorage.getItem("x-auth-token");

  useEffect(() => {
    (async function () {
      if (token) {
        const info = await query(url, token);
        setData(info);
        const myposts = await query(urlForData, token);
        setPosts(myposts);
        setPapers(myposts.length);
      } else {
        navigate("/login");
      }
    })();
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
            <p>{data.bio ? data.bio : "your bio wiil appear here"}</p>
            <div className={styles.stats}>
              <p onClick={viewFeed}>{papers} Papers</p>
              <p onClick={viewFollowers}>{data.followers.length} Followers</p>
              <p onClick={viewFollowing}> Following</p>
            </div>
          </div>
          {feed && (
            <div>
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
          {following && (
            <div>
              <h4>following</h4>
            </div>
          )}
          {followers && (
            <div>
              {data &&
                data.followers.map((item, index) => {
                  return (
                    <AuthorCard
                      key={index}
                      name={item.name}
                      id={item._id}
                      followers={33}
                    />
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;

import styles from "./compStyles/topbar.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function TopBar() {
  const [name, setName] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("x-auth-token");
    if (authToken) {
      setName(true);
    }
  }, []);

  async function Logout() {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.reload();
  }

  return (
    <div>
      <div className={styles.topBar}>
        <h3>FRES-INK</h3>
        <img
        onClick={Logout}
        alt="menu"
        src="https://img.icons8.com/ios-glyphs/30/ffffff/exit.png"/>
      </div>
      {name && (
        <div className={styles.subNav}>
          <Link to="/">
            <div className={styles.iconContainer}>
              <img
                alt="posts"
                src="https://img.icons8.com/ios/50/000000/documents.png"
              />
              <h4>Feed</h4>
            </div>
          </Link>
          <Link to="/authors">
            <div className={styles.iconContainer}>
              <img
                alt="authors"
                src="https://img.icons8.com/ios/50/000000/groups.png"
              />
              <h4>Authors</h4>
            </div>
          </Link>
          <Link to="/profile">
            <div className={styles.iconContainer}>
              <img
                alt="profile"
                src="https://img.icons8.com/ios/32/000000/user-male-circle.png"
              />
              <h4>Profile</h4>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopBar;

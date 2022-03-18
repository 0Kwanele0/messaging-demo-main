import { useState, useEffect } from "react";
import styles from "./pageStyles/home.module.scss";
import { useNavigate, Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import query from "../modules/query";

function Home() {
  const url = "http://localhost:3001/api/data/";
  const [name, setname] = useState(false);
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("x-auth-token");

  useEffect(() => {
    (async function () {
      if (token) {
        setname(true);
        const info = await query(url, token);
        setData(info);
      } else {
        navigate("/login");
      }
    })();
    return () => {};
  }, [navigate]);

  return (
    <div>
      {name && (
        <div className={styles.container}>
          <Link to="/create">
            <div className={styles.createBtn}>
              <img
                alt="create post"
                src="https://img.icons8.com/ios-glyphs/30/ffffff/plus-math.png"
              />
            </div>
          </Link>
          <div className={styles.content}>
            {data.length > 0 &&
              data.map((item, key) => {
                return (
                  <PostCard
                    id={item._id}
                    title={item.title}
                    note={item.description}
                    hisname={item.authorName}
                    likes={item.likes}
                    downloads={item.downloads}
                    key={key}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

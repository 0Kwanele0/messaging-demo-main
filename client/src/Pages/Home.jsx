import { useState, useEffect } from "react";
import styles from "./pageStyles/home.module.scss";
import { NameContext } from "../context";
import { useNavigate, Link } from "react-router-dom";
import PostCard from "../components/PostCard";

function Home() {
  const [name, setname] = useState(false);
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [hisName, setHisname] = useState("");

  useEffect(() => {
    async function getName() {
      const theName = await localStorage.getItem("x-auth-token");
      if (theName) {
        setHisname(localStorage.getItem("userName"));
        setname(true);
        fetch("http://localhost:3001/api/data/", {
          method: "GET",
          headers: { "x-auth-token": theName },
        })
          .then(async (thedata) => {
            const fixedData = await thedata.json();

            setData(fixedData);
          })
          .catch((err) => console.log(err));
      } else {
        navigate("/login");
      }
    }
    getName();
  }, [name, navigate, data, hisName]);

  return (
    <div>
      {name && (
        <NameContext.Consumer>
          {(myname) => (
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
              {data.length>0 &&
                data.map((item, key) => {
                  if (item.authorName !== hisName){
                    return (
                      <PostCard
                        title={item.title}
                        note={item.description}
                        hisname={item.authorName}
                        likes={item.likes}
                        downloads={item.downloads}
                        key={key}
                      />
                    )
                  }
                  return("")
                })}
              </div>
            </div>
          )}
        </NameContext.Consumer>
      )}
    </div>
  );
}

export default Home;

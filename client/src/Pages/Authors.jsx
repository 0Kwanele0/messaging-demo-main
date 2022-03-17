import AuthorCard from "../components/AuthorCard";
import styles from "./pageStyles/author.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import query from "../modules/query";

function Authors() {
  const [author, setAuthors] = useState();
  const [hisname, setHisname] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3001/api/user";
  const token = localStorage.getItem("x-auth-token");

  useEffect(() => {
    (async function () {
      if (token) {
        setHisname(localStorage.getItem("userName"));
        const info = await query(url, token);
        setAuthors(info);
      } else {
        navigate("/login");
      }
    })();
  }, [navigate]);

  return (
    <div>
      {author && (
        <div className={styles.container}>
          {author.map((item, index) => {
            return hisname !== item.fullname ? (
              <AuthorCard
                key={index}
                name={item.fullname}
                id={item._id}
                followers={item.followers.length}
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default Authors;

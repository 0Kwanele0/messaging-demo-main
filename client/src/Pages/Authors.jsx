import AuthorCard from "../components/AuthorCard";
import styles from "./pageStyles/author.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authors() {
  const [name, setname] = useState(false);
  const [author, setAuthors] = useState();
  const [hisname, setHisname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getName() {
      const token = await localStorage.getItem("x-auth-token");
      if (token) {
        setname(true);
        setHisname(localStorage.getItem("userName"))
        fetch("http://localhost:3001/api/user", {method:"GET", headers:{"content-type":"application/json", "x-auth-token": token}}).then(async authors=>{
          const data = await authors.json()
          setAuthors(data)
        }).catch((errer)=>{console.log(errer)})
      } else {
        navigate("/login");
      }
    }
    getName();
  }, [name, navigate]);
  return (
    <div>
      {author && (
        <div className={styles.container}>
          {author.map((item, index)=>{
            if (hisname !== item.fullname){
              return(
              <AuthorCard key={index} name={item.fullname} followers={item.followers.length} />
              )
            }
          })}
        </div>
      )}
    </div>
  );
}

export default Authors;

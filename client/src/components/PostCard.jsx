import styles from "./compStyles/card.module.scss";

function PostCard(props) {
  const token = localStorage.getItem("x-auth-token");
  const id = props.id;
  const url = "http://localhost:3001/api/data/like/" + id.replace(/['']+/g, "");
  async function liked() {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json", "x-auth-token": token },
    })
      .then(async (data) => {
        const res = await data.json();
        console.log(res);
        console.log("liked");
      })
      .catch((err) => {
        console.log("did not work:", err);
      });
  }
  function downloaded() {
    console.log("Downloaded");
  }

  return (
    <div className={styles.container}>
      <div className={styles.person}>
        <div className={styles.hisDetails}>
          <div className={styles.hisImage}></div>
          <h3>{props.hisname}</h3>
        </div>
        <p>20-12-2027</p>
      </div>
      <div className={styles.postImage}></div>

      <div className={styles.content}>
        <h4>{props.title}</h4>
        <p>{props.note}</p>
        <div className={styles.reactions}>
          <div className={styles.likes}>
            <img
              onClick={liked}
              alt="like"
              src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/50/000000/external-like-instagram-flatart-icons-outline-flatarticons.png"
            />
            <p>{props.likes}</p>
          </div>
          <div className={styles.downloads}>
            <img
              onClick={downloaded}
              alt="download"
              src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-download-interface-kiranshastry-lineal-kiranshastry.png"
            />
            <p>{props.downloads}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

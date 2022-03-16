import styles from "./compStyles/author.module.scss";

function AuthorCard(props) {
  const token = localStorage.getItem("x-auth-token");
  const id = localStorage.getItem("userId");
  const url =
    "http://localhost:3001/api/user/addfriend/" + id.replace(/['']+/g, "");

  function addFriend() {
    let data = {
      name: props.name,
      id: props.id,
    };
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json", "x-auth-token": token },
      body: JSON.stringify(data),
    })
      .then(async (mydata) => {
        const res = await mydata.json();
        console.log(res);
      })
      .catch((err) => console.log("err", err));
  }

  return (
    <div className={styles.container}>
      <div className={styles.hisDetails}>
        <div className={styles.hisImage}></div>
        <div>
          <h3>{props.name}</h3>
          <p>{props.followers} Followers</p>
        </div>
      </div>
      <h4 onClick={addFriend}>Follow +</h4>
    </div>
  );
}

export default AuthorCard;

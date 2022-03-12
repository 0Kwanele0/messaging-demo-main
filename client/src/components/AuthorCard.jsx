import styles from "./compStyles/author.module.scss";

function AuthorCard(props) {
  return (
    <div className={styles.container}>
      <div className={styles.hisDetails}>
        <div className={styles.hisImage}></div>
        <div>
          <h3>{props.name}</h3>
          <p>{props.followers} Followers</p>
        </div>
      </div>
      <h4>Follow +</h4>
    </div>
  );
}

export default AuthorCard;

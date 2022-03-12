import styles from "./compStyles/privatePostCard.module.scss";

function PrivatePostCard(props) {
const today = props.date

  function deleteData (){
    const token = localStorage.getItem("x-auth-token");
    const urlForData = "http://localhost:3001/api/data/" + props.id.replace(/['']+/g,'')
    fetch(urlForData,{method:"DELETE", headers:{
      "content-type":"application/json", "x-auth-token":token
    }}).then(data=>{console.log("data deleted")}).catch(err=>{console.log("failed to delete")})

  }
  
  return (
    <div className={styles.container}>
      <div className={styles.person}>
        <div className={styles.hisDetails}>
        <p>{today}</p>
          <div className={styles.menu}>
          <img onClick={deleteData} className={styles.trash} alt="trash" src="https://img.icons8.com/ios/50/000000/trash--v1.png"/>
          </div>
        </div>
      </div>
      <div className={styles.postImage}></div>

      <div className={styles.content}>
        <h4>{props.title}</h4>
        <p>{props.note}</p>
        <div className={styles.reactions}>
          <div className={styles.likes}>
            <img
              alt="like"
              src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/50/000000/external-like-instagram-flatart-icons-outline-flatarticons.png"
            />
            <p>{props.likes}</p>
          </div>
          <div className={styles.downloads}>
            <img
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

export default PrivatePostCard;

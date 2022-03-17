export default async function query(url, token) {
  return fetch(url, {
    method: "GET",
    headers: { "Content-type": "application/json", "x-auth-token": token },
  })
    .then(async (response) => {
      const data = await response.json();
      return data;
    })
    .catch((erro) => {
      return erro;
    });
}

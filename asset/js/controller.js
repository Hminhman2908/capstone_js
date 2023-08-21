const URL = "https://64e380ccbac46e480e78e305.mockapi.io/product";

export let fetchProduct = () => {
  turnSpinner();
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      offSpinner();
      renderHTML(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export function turnSpinner() {
  document.getElementById("spinner").style.display = "flex";
}

export function offSpinner() {
  document.getElementById("spinner").style.display = "none";
}

export let renderHTML = (list) => {
  let createHTML = "";
  list.forEach((item, index) => {
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
      item;
    let contentTr = `
      <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td><img src="${img}" alt=""></td>
        <td>${desc}</td>
      </tr>
    `;
    createHTML += contentTr;
  });
  document.getElementById("tbody").innerHTML = createHTML;
};

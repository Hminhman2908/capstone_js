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
    <div class="col-4 mt-5">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${img}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${desc}</p>
        </div>
        <div class="card-body" style="display:flex">
          <p class="card-text">Giá: ${price}</p>
          <button class="btn btn-danger ml-5" style="width:100px">
            <i class="fa fa-shopping-cart" style="color:white"></i>
          </button>
        </div>
      </div>
    </div>
    `;
    createHTML += contentTr;
  });
  document.getElementById("contents-items").innerHTML = createHTML;
};

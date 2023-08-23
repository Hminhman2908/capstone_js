export let URL = "https://64e380ccbac46e480e78e305.mockapi.io/product";

var dssp = [];

export let fetchProduct = () => {
  turnSpinner();
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      offSpinner();
      renderHTML(res.data);
      dssp.push(res.data);
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
      <div class="col-6 col-md-4 col-xl-3">
        <div class="card animate__animated animate__backInLeft animate__delay-1s">
          <img class="card-img-top" src="${img}" alt="${name}">
          <div class="card-body">
            <h6 class="card-title text-center">${name}</h6>
            <p class="card-text text-danger text-center">${price}<sup><u>$</u></sup></p>
          </div>
          <div class="text-right p-2">
              <button class="btn btn-danger" onclick="addCart()">
                  <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
              </button>
              <button class="btn btn-outline-primary">
                  <i class="fa fa-book text-primary" aria-hidden="true"></i>
              </button>
          </div>
        </div>
      </div>
    `;
    createHTML += contentTr;
  });
  document.getElementById("contents-items").innerHTML = createHTML;
};

export let renderItemCart = (list) => {
  let createTr = "";
  list.forEach((item, index) => {
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
      item;
    createTr += `
        <tr>
          <td><img src="${img}" alt="Not img"</td>
          <td>${name}</td>
          <td>0</td>
          <td>${price}</td>
          <td>
            <button class='btn btn-danger'><i class="fi-trash"></i></button>
          </td>
        </tr>
      `;
  });
  document.getElementById("tbodyItem").innerHTML = createTr;
};

const URL = "https://64e380ccbac46e480e78e305.mockapi.io/product";

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
    <div class="col-6 col-md-4 col-xl-3 mb-2">
      <div class="card animate__animated animate__backInUp animate__delay-4s">
        <img class="card-img-top" src="${img}" alt="${name}">
        <div class="card-body">
          <h6 class="card-title text-center">${name}</h6>
          <p class="card-text text-danger text-center">${price}<sup><u>$</u></sup></p>
        </div>
        <div class="text-right">
            <a class="btn btn-sm btn-danger">
                <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
            </a>
            <a class="btn btn-sm btn-outline-primary" onclick="chiTietSanPham('${id}')">
                <i class="fa fa-book text-primary" aria-hidden="true"></i>
            </a>
        </div>
      </div>
    </div>
    `;
    createHTML += contentTr;
  });
  document.getElementById("contents-items").innerHTML = createHTML;
};

// function chiTietSanPham(id) {
//   let item = dssp.find((x) => x.id == id);
//   modalTitle.innerHTML = item.name;
//   let html = `
//       <img src="${item.img}" class="img-fluid">
//       <p class="text-danger text-center mt-2">Giá Bán: ${item.price}
//       )} <sup><u>$</u></sup></p>
//   `;
//   modalBody.innerHTML = html;
//   showModal.click();
// }

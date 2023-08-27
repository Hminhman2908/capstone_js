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
  renderTotalItemCart();
};

export function turnSpinner() {
  document.getElementById("spinner").style.display = "flex";
}

export function totalPrice() {
  const listCart = window.localStorage.getItem("listCart");
  const totalItemInCart = listCart ? JSON.parse(listCart) : [];
  const totalPrice = totalItemInCart.reduce(
    (prev, curr) => prev + curr.price,
    0
  );

  document.getElementById("total").innerText = totalPrice;
}

export function renderTotalItemCart() {
  const listCart = window.localStorage.getItem("listCart");

  const totalItemInCart = listCart ? JSON.parse(listCart).length : 0;
  document.getElementById("Th_Mua_hang").innerText = totalItemInCart;
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
      <div class="col-12 col-sm-6 col-md-4 col-xl-3 pb-4">
        <div class="card animate__animated animate__backInLeft animate__delay-1s">
          <img class="card-img-top" src="${img}" alt="${name}">
          <div class="card-body">
            <h6 class="card-title text-center text-danger">${name}</h6>
            <p class="card-text text-danger text-center">${price}<sup><u>$</u></sup></p>
          </div>
          <div class="text-right p-2">
              <button class="btn btn-danger" onclick="addCart(${id})">
                  <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
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
  let listCart = [];
  let createTr = "";

  list.forEach((element) => {
    const itemInCart = listCart.find((e) => e.id === element.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      element.quantity = 1;
      listCart.push(element);
    }
  });

  listCart.forEach((item, index) => {
    let {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      quantity,
    } = item;
    createTr += `
        <tr>
          <td><img src="${img}" width="100px" alt="Not img"</td>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>${price * quantity}</td>
          <td>
            <button class='btn btn-danger' onclick="deleteItem(${id})"><i class="fi-trash">Detele</i></button>
          </td>
        </tr>
      `;
  });
  document.getElementById("tbodyItem").innerHTML = createTr;
};

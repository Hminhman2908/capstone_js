import {
  URL,
  fetchProduct,
  offSpinner,
  renderHTML,
  renderItemCart,
  turnSpinner,
  renderTotalItemCart,
  totalPrice,
} from "./controller.js";

const APPLE = "Apple";
const SAMSUNG = "Samsung";

fetchProduct();

window.showCart = () => {
  document.getElementById("cart_show").style.display = "flex";
  renderItemCart(JSON.parse(window.localStorage.getItem("listCart")));
  totalPrice();
};

window.outCart = () => {
  document.getElementById("cart_show").style.display = "none";
};

// Loại
document.getElementById("selectList").addEventListener("change", function () {
  var list = [];
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      list = res.data;
      if (this.value == APPLE) {
        let arrayIP = list.filter((item) => item.type === "Iphone");
        renderHTML(arrayIP);
      } else if (this.value == SAMSUNG) {
        let arraySS = list.filter((item) => item.type === "Samsung");
        renderHTML(arraySS);
      } else {
        renderHTML(list);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Search
window.searchList = () => {
  var list = [];
  let nameSearch = document.getElementById("searchIP").value;
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      list = res.data;
      console.log("🚀 ~ file: main.js:61 ~ .then ~ list:", list);
      let objSearch = list.filter((item) =>
        item.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
      renderHTML(objSearch);
    })
    .catch((err) => {
      console.log("🚀 ~ file: main.js:62 ~ err:", err);
    });
};

// Cart
window.addCart = (id) => {
  console.log("🚀 ~ file: main.js:69 ~ id:", id);

  console.log(window.localStorage.getItem("listCart"));
  var listCart = JSON.parse(window.localStorage.getItem("listCart"));
  var list = listCart || [];
  axios({
    url: `${URL}/${id}`,
    // url: URL,
    method: "GET",
  })
    .then((res) => {
      console.log("list: ", list);
      list.push(res.data);
      document.getElementById("Th_Mua_hang").innerText = list.length;
      document.getElementById("Th_Mua_hang").style.color = "red";
      console.log(list.length);
      console.log(list);
      window.localStorage.setItem("listCart", JSON.stringify(list));
      // renderItemCart(list);
    })
    .catch((err) => {
      console.log(err);
    });
};
window.deleteItem = (id) => {
  var listCart = JSON.parse(window.localStorage.getItem("listCart"));

  var newListCart = listCart.filter((element) => element.id !== String(id));
  window.localStorage.setItem("listCart", JSON.stringify(newListCart));
  renderItemCart(newListCart);
  renderTotalItemCart();
  totalPrice();
};

window.clearCart = () => {
  window.localStorage.removeItem("listCart");
  renderItemCart([]);
  renderTotalItemCart();
  totalPrice();
};

window.purchase = () => {
  window.clearCart();
  window.outCart();
  totalPrice();
  alert("Mua hàng thành công !");
};

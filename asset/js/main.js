import { checkSearch } from "../../admin/js/validate.js";
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
  renderItemCart(JSON.parse(window.localStorage.getItem("listCart")) || []);
  totalPrice();
};

window.outCart = () => {
  document.getElementById("cart_show").style.display = "none";
};

// Sort
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
  let nameSearch = document.getElementById("searchIP").value.trim();
  var isValid = checkSearch(nameSearch);
  if (!isValid) return;
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
      document.getElementById(
        "search-alert"
      ).innerHTML = `There are ${objSearch.length} results match your search.`;
      document.getElementById("search-alert").classList.remove("d-none");
    })
    .catch((err) => {
      console.log("🚀 ~ file: main.js:62 ~ err:", err);
      turnSpinner();
    });
};

// Cart
window.addCart = (id) => {
  var listCart = JSON.parse(window.localStorage.getItem("listCart"));
  var list = listCart || [];
  axios({
    url: `${URL}/${id}`,
    method: "GET",
  })
    .then((res) => {
      list.push(res.data);
      document.getElementById("Th_Mua_hang").innerText = list.length;
      document.getElementById("Th_Mua_hang").style.color = "red";
      window.localStorage.setItem("listCart", JSON.stringify(list));
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
  // alert("Mua hàng thành công !");
};

window.soLuong = (id, sl) => {
  let tr = sl.parentNode.parentNode.parentNode;
  // console.log("🚀 ~ file: main.js:125 ~ tr:", tr.children[4]);
  let soLuong = sl.value;
  axios({
    url: `${URL}/${id}`,
    method: "GET",
  })
    .then((res) => {
      let newPrice = Number(soLuong) * Number(res.data.price);
      tr.children[4].innerHTML = `${newPrice}$`;
    })
    .catch((err) => {
      console.log("🚀 ~ file: main.js:126 ~ err:", err);
    });
};
window.toggleRowActive = (button) => {
  const itemRow = button.closest(".item-row");
  const isActive = itemRow.classList.contains("active");

  const allItemRows = document.querySelectorAll(".item-row");
  allItemRows.forEach((row) => row.classList.remove("active"));

  if (!isActive) {
    itemRow.classList.add("active");
  }
};

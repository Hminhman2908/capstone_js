import {
  URL,
  fetchProduct,
  offSpinner,
  renderHTML,
  renderItemCart,
  turnSpinner,
} from "./controller.js";

const APPLE = "Apple";
const SAMSUNG = "Samsung";

fetchProduct();

window.showCart = () => {
  document.getElementById("cart_show").style.display = "flex";
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
// window.addCart = (id) => {
//   var list = [];
//   axios({
//     url: `${URL}/${id}`,
//     // url: URL,
//     method: "GET",
//   })
//     .then((res) => {
//       list.push(res.data);
//       document.getElementById("Th_Mua_hang").innerText = list.length;
//       document.getElementById("Th_Mua_hang").style.color = "red";
//       console.log(list.length);
//       console.log(list);
//       renderItemCart(list);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

import { fetchProduct } from "./controller.js";

fetchProduct();

window.showCart = () => {
  document.getElementById("cart_show").style.display = "flex";
};

window.outCart = () => {
  document.getElementById("cart_show").style.display = "none";
};

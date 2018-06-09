let cartItem = JSON.parse(sessionStorage.getItem("cartItem"));
console.log("cartItem", cartItem);
let cartSection = document.querySelector("#cartItems");


if (cartItem) {
  let template = document.querySelector("#cartItemTemplate").content;
  let clone = template.cloneNode(true);

  clone.querySelector(".title_cart").innerHTML = cartItem.title;
  clone.querySelector(".img_cart").setAttribute("src", cartItem.img);
  clone.querySelector(".type_cart").textContent = cartItem.type;
  clone.querySelector(".price_cart").textContent = cartItem.price + "£";
  clone.querySelector(".size_cart").textContent = cartItem.size;
  cartSection.appendChild(clone);
  let removeBtn = document.querySelector(".remove");
  removeBtn.addEventListener("click", removeItem);
  //init total price
  selectQ();
} else {
  console.log("no items")

}

function selectQ() {
  let quantity = document.getElementById("selector").value;
  console.log("quantity", quantity)
  document.getElementById("totalsum").innerHTML = "Total: " + cartItem.price * quantity + "&#163;";
  let oneItemSum = cartItem.price * quantity;
  let oneItemTitle = cartItem.title;
  document.querySelector(".item_total").innerHTML = oneItemTitle + " x " + quantity + " = " + oneItemSum;


}



function removeItem() {
  let cartDiv = document.getElementById("cartDiv");
  sessionStorage.removeItem("cartItem");
  cartSection.removeChild(cartDiv);
  emptyTotal();

}

function emptyTotal() {
  document.querySelector(".item_total").innerHTML = 0;
  document.getElementById("totalsum").innerHTML = 0;

}



function goBack() {
  window.history.back();
}
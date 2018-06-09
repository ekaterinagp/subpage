let cartItem = JSON.parse(sessionStorage.getItem("cartItem"));
console.log("cartItem", cartItem);

if (cartItem) {
  let template = document.querySelector("#cartId").content;
  let clone = template.cloneNode(true);
  let cartDiv = document.getElementById("cartDiv");
  clone.querySelector(".title_cart").innerHTML = cartItem.title;
  clone.querySelector(".img_cart").setAttribute("src", cartItem.img);
  clone.querySelector(".type_cart").textContent = cartItem.type;


  clone.querySelector(".price_cart").textContent = cartItem.price;
  clone.querySelector(".size_cart").textContent = cartItem.size;
  let cartSection = document.querySelector("#cartItems");
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
  document.getElementById("totalsum").innerHTML = cartItem.price * quantity;
  let oneItemSum = cartItem.price * quantity;
  let oneItemTitle = cartItem.title;
  document.querySelector(".item_total").innerHTML = oneItemTitle + " x " + quantity + " = " + oneItemSum;


}



function removeItem() {
  sessionStorage.removeItem("cartItem");
  cartSection.removeChild[0]("cartDiv");


}



function goBack() {
  window.history.back();
}
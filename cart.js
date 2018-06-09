let cartItem = JSON.parse(sessionStorage.getItem("cartItem"));
console.log("cartItem", cartItem);

if (cartItem) {
  let template = document.querySelector("#cartId").content;
  let clone = template.cloneNode(true);
  clone.querySelector(".title_cart").innerHTML = cartItem.title;
  clone.querySelector(".img_cart").setAttribute("src", cartItem.img);
  clone.querySelector(".type_cart").textContent = cartItem.type;

  clone.querySelector(".price_cart").textContent = cartItem.price;
  clone.querySelector(".size_cart").textContent = cartItem.size;
  let cartSection = document.querySelector("#cartItems");
  cartSection.appendChild(clone);
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
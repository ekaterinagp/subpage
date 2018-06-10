let cart = JSON.parse(sessionStorage.getItem("cart"));
console.log("cart", cart);
let cartSection = document.querySelector("#cartItems");


if (cart) {
  cart.forEach(cartItem => {
    let template = document.querySelector("#cartItemTemplate").content;
    let clone = template.cloneNode(true);
    clone.querySelector(".title_cart").innerHTML = cartItem.title;
    clone.querySelector(".img_cart").setAttribute("src", cartItem.img);
    clone.querySelector(".cartDiv").setAttribute("id", cartItem.id);
    clone.querySelector(".type_cart").textContent = cartItem.type;
    clone.querySelector(".price_cart").textContent = cartItem.price + "£";
    clone.querySelector(".size_cart").textContent = cartItem.size;
    let removeBtn = clone.querySelector(".remove");


    removeBtn.addEventListener("click", function() {
      console.log("removeItemId: ", cartItem.id);
      removeItem(cartItem.id);
    })

    cartSection.appendChild(clone);
  });


  // //init total price
  // selectQ();
} else {
  emptyTotal();

}

selectQ();

function selectQ() {
  let totalPrice = 0;
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.forEach(cartItem => {
    // let quantity = document.getElementById("selector").value;
    // console.log("quantity", quantity)
    totalPrice = totalPrice + parseInt(cartItem.price);

    let oneItemSum = cartItem.price;
    let oneItemTitle = cartItem.title;
    let template = document.querySelector(".item_total").content;
    let clone = template.cloneNode(true);
    clone.innerHTML = oneItemTitle + " " + oneItemSum;


  })
  document.getElementById("totalsum").innerHTML = "Total: " + totalPrice + "&#163;";
}


// review.forEach(function(item, index, object) {
//   if (item === 'a') {
//     object.splice(index, 1);
//   }
// });



function removeItem(cartItemId) {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.forEach(function(cartItem, index, object) {
    if (cartItem.id === cartItemId) {
      object.splice(index, 1);
    }
  });
  sessionStorage.setItem("cart", JSON.stringify(cart));
  // let cartItemElement = document.getElementById("cartItemId");
  let cartItemElement = document.getElementById(cartItemId);
  cartItemElement.remove();
  selectQ();
}





function emptyTotal() {
  document.querySelector(".item_total").innerHTML = 0;
  document.getElementById("totalsum").innerHTML = 0;

}



function goBack() {
  window.history.back();
}
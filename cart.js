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

} else {
  emptyTotal();

}

selectQ();

function selectQ() {
  console.log("selectQ: run");
  let totalPrice = 0;
  let sectionTotal = document.getElementById("totalItemsSection");
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.forEach(cartItem => {
    //parseInt takes a string and returns a number 
    totalPrice = totalPrice + parseInt(cartItem.price);

    let oneItemSum = cartItem.price;
    let oneItemTitle = cartItem.title;
    let template = document.querySelector("#totalItemsTemplate").content;
    let clone = template.cloneNode(true);
    // clone.querySelector(".totalDiv").setAttribute("id", cartItem.id);
    // clone.querySelector(".totalItemsTitle").innerHTML = oneItemTitle + " " + oneItemSum + "£";
    sectionTotal.appendChild(clone);


  })
  document.getElementById("totalsum").innerHTML = "Total: " + totalPrice + "&#163;";
}



function removeItem(cartItemId) {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cart.forEach(function(cartItem, index, object) {
    if (cartItem.id === cartItemId) {
      object.splice(index, 1);
    }
  });
  sessionStorage.setItem("cart", JSON.stringify(cart));
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
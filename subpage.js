let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
showLoader();

function createCartItem() {
  let cartItem = {
    id: 0,
    img: "",
    title: "",
    price: 0,
    type: "",
    size: "",
  }
  return cartItem;
}

let currentCartItem = {};


let addBtn = document.querySelector(".add");
let cartImg = document.querySelector(".cart");
let numberOfItem = document.querySelector(".number");

checkCart();
addBtn.addEventListener('click', function() {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart) {
    //adds one or more elements to the array cart
    cart.push(currentCartItem);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart = [];
    cart.push(currentCartItem);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  checkCart();
});

function checkCart() {
  let cart = JSON.parse(sessionStorage.getItem("cart"));

  if ((cart) && (cart.length > 0)) {
    numberOfItem.innerHTML = cart.length;
    numberOfItem.setAttribute("style", "display:block;");

  } else {
    numberOfItem.setAttribute("style", "display: none;");
  }


}




fetch("http://valsdottir.net/kea/07-cms/wordpress/wp-json/wp/v2/artist/" + id + "?_embed")
  .then(e => e.json())
  .then(showSingleArt)

function showSingleArt(aArt) {
  hideLoader();
  console.log("aArt:", aArt);

  document.querySelector(".title-more").innerHTML = aArt.title.rendered;
  document.querySelector(".desc-more").innerHTML = aArt.content.rendered;
  document.querySelector(".medium-more").textContent = aArt.acf.medium;
  document.querySelector(".size-more").textContent = "Size: " + aArt.acf.size;
  document.querySelector(".price-more span").textContent = "Price: " + aArt.acf.price;
  if (aArt.acf.price == 0) {
    document.querySelector(".price-more").style.display = "none";
  }
  if (aArt.acf.size == 0) {
    document.querySelector(".size-more").style.display = "none";
  }
  if (aArt._embedded["wp:featuredmedia"][0].media_details.sizes.large) { //img is there
    document.querySelector(".img-more").setAttribute("src", aArt._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url)
  } else {
    document.querySelector(".img-more").setAttribute("src", aArt._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  };



  let cartItem = createCartItem();
  cartItem.id = aArt.id;
  cartItem.img = aArt._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
  cartItem.title = aArt.title.rendered;
  cartItem.price = parseInt(aArt.acf.price);
  cartItem.type = aArt.acf.medium;
  cartItem.size = aArt.acf.size;

  currentCartItem = cartItem;

  fetchSimilarItems(aArt.categories[1]);
}





//use the second category of the item to fetch similar items (because the first category for each item is All)






function fetchSimilarItems(categoryId) {
  fetch("http://valsdottir.net/kea/07-cms/wordpress/wp-json/wp/v2/artist?_embed&per_page=6" + "&categories=" + categoryId)
    .then(e => e.json())
    .then(showSimilarItems)
}

let countSimilarItems = 0;

function showSimilarItems(data) {
  console.log(data);
  data.forEach(showSingleItem);
}

function showSingleItem(item) {

  if (currentCartItem.id === item.id) {
    return;
  }
  countSimilarItems = countSimilarItems + 1;
  if (countSimilarItems > 3) {
    return;
  }
  let template = document.querySelector("#similartemp").content;
  let clone = template.cloneNode(true);
  let similarItem = clone.querySelector(".similaritem");
  similarItem.setAttribute("id", item.id);

  clone.querySelector(".itemimg").setAttribute("src", item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  let similar = document.querySelector("#similar");
  clone.querySelector(".more").href = "subpage.html?id=" + item.id;

  similar.appendChild(clone);

}


let modal = document.getElementById("subModal");
let subImg = document.getElementById("subImg");
let modalImg = document.getElementById("imgSub");
subImg.onclick = function() {
  modal.style.display = "block";
  modalImg.src = this.src;
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

function goBack() {
  window.history.back();
}
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
showLoader();
let cartItem = {
  img: "",
  title: "",
  price: 0,
  type: "",
  size: "",
}
let addBtn = document.querySelector(".add");
let cartImg = document.querySelector(".cart");


addBtn.addEventListener('click', function() {
  sessionStorage.setItem("cartItem", JSON.stringify(cartItem));
  cartImg.setAttribute("style", "background-color: red;");
});




fetch("http://valsdottir.net/kea/07-cms/wordpress/wp-json/wp/v2/artist/" + id + "?_embed")
  .then(e => e.json())
  .then(showSingleArt)

function showSingleArt(aArt) {
  hideLoader();
  console.log("aArt:", aArt);

  document.querySelector(".title-more").innerHTML = aArt.title.rendered;
  document.querySelector(".desc-more").innerHTML = aArt.content.rendered;
  document.querySelector(".medium-more").textContent = aArt.acf.medium;
  document.querySelector(".size-more").textContent = aArt.acf.size;
  document.querySelector(".price-more span").textContent = aArt.acf.price;
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

  cartItem = {
    img: aArt._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url,
    title: aArt.title.rendered,
    price: aArt.acf.price,
    type: aArt.acf.medium,
    size: aArt.acf.size,
  }

  console.log('cartItem: ', cartItem);



  //use the second category of the item to fetch similar items (because the first category for each item is All)
  fetchSimilarItems(aArt.categories[1]);

}



function fetchSimilarItems(categoryId) {
  fetch("http://valsdottir.net/kea/07-cms/wordpress/wp-json/wp/v2/artist?_embed&per_page=100" + "&categories=" + categoryId)
    .then(e => e.json())
    .then(showSimilarItems)
}

function showSimilarItems(data) {
  console.log(data);
  data.forEach(showSingleItem);
}

function showSingleItem(item) {
  let template = document.querySelector("#similartemp").content;
  let clone = template.cloneNode(true);
  let similarItem = clone.querySelector(".similaritem");
  similarItem.setAttribute("id", item.id);

  clone.querySelector(".itemimg").setAttribute("src", item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  let similar = document.querySelector("#similar");
  clone.querySelector(".more").href = "subpage.html?id=" + item.id;

  similar.appendChild(clone);

}



function goBack() {
  window.history.back();
}
// function showLoader() {
//   let loader = document.querySelector(".container");
//   loader.classList.remove("hiddenloader");
// }

// function hideLoader() {
//   let loader = document.querySelector(".container");
//   loader.classList.add("hiddenloader");

// }

// showLoader();
window.addEventListener('load', () => {
  // hideLoader();
  document.querySelector(".page").classList.remove("hiddenloader");
});

let i = 0;
let video = document.querySelector("#anim");
let vidmobile = document.querySelector("#anim-mobile")
let vidtablet =document.querySelector("#anim-tablet")

setInterval(changeSrc, 80);

function changeSrc() {
  video.src = "animation/testing" + i + ".jpg";
  vidmobile.src = "animation/testing-mobile" + i + ".jpg";
    vidtablet.src="animation/test-tablet"+ i + ".jpg";
  i++;
  if (i > 57) {
    i = 0;
  }
}

var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
  setTimeout(function() {
    window.location.href = page;

  }, 200);
}

window.onload = function () {
  preloader();
  document.querySelector("#main").classList.remove("disappear");
};




function preloader() {
  // create object
  imageObj = new Image();
  
  imageObj.src="../img/lookas/distance/distance_3.png";

  // start preloading
  for(var i = 1; i <= 65; i++) 
  {
    imageObj.src="../img/lookas/overview/lookas_" + (i < 10 ? "0" : "") + i + ".jpg";
  }
  
  updateImage();
}


var lookas_img = document.querySelector("#lookas-img");
var lookas_img_index = 0;
var interval_time = 250;

function updateImage() {
  var t = (lookas_img_index == 64 || lookas_img_index == 35 ? 1500 : 250);
  setTimeout(function() {
    lookas_img.src="../img/lookas/overview/lookas_" + (lookas_img_index+1 < 10 ? "0" : "") + (lookas_img_index+1) + ".jpg"
    lookas_img_index = (lookas_img_index + 1) % 65;
    updateImage();
  }, t);
}


//var distance_img = document.querySelector("#distance-img");
//var distance_img_index = 0;
//
//setInterval(function() {
//  distance_img.src="../img/lookas/distance/distance_" + (distance_img_index+2) + ".png"
//  distance_img_index = (distance_img_index + 1) % 2;
//}, 1000);
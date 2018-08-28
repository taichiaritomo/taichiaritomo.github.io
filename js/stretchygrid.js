// LOADING

window.onload = function () {
  document.querySelector("#main").classList.remove("disappear");
};

var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
  setTimeout(function() {
    window.location.href = page;

  }, 200);
}



// VIDEO

var vid = document.querySelector("#video_stretchy-grid");

vid.addEventListener("ended", function(event) {
  vid.currentTime = 0;
    if (checkMostlyVisible(v)) {
        vid.play();
    }
});

vid.play();
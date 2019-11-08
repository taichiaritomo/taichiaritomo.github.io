window.onload = function () {
  document.querySelector("#main").classList.remove("disappear");
};

var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
  setTimeout(function() {
    window.location.href = page;

  }, 200);
}
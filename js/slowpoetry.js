function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}












var text = document.querySelector("textarea");
var amount = 0;
setInterval(function() {
  text.style["-webkit-text-stroke-width"] = amount + "px";
  amount += 0.1;
}, 50);

function resetAmount() {
  amount = 0;
}

window.onload = function() {
  document.querySelector("#main").classList.remove("disappear");
//  moveCursorToEnd(text);
}

var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
  setTimeout(function() {
    window.location.href = page;

  }, 200);
}



//var colors_container = document.querySelector("#colors");
//var input_textcolor = document.querySelector("#input_textcolor");
//var wrapper_textcolor = document.querySelector("#wrapper_textcolor");
//var input_backgroundcolor = document.querySelector("#input_backgroundcolor");
//var wrapper_backgroundcolor = document.querySelector("#wrapper_backgroundcolor");
//
//function setTextColor(colorHex) {
//  var colorString = "#" + colorHex;
//  text.style["-webkit-text-stroke-color"] = colorString;
//  text.style["caret-color"] = colorString;
//  input_backgroundcolor.style["color"] = colorString;
//  wrapper_textcolor.style["background"] = colorString;
//  wrapper_backgroundcolor.style["color"] = colorString;
//  colors.style["color"] = colorString;
//  colors_container.style["border-color"] = colorString;
//  
//}
//
//input_textcolor.addEventListener("input", function() {
//  console.log("text color");
//  var input_length = input_textcolor.value.length;
//  if (input_length == 3 || input_length == 6) {
//    setTextColor(input_textcolor.value);
////    updateURL();
//  }
//});
//
//function setBGColor(colorHex) {
//  var colorString = "#" + colorHex;
//  text.style["background"] = colorString;
//  wrapper_backgroundcolor.style["background"] = colorString;
//  wrapper_textcolor.style["color"] = colorString;
//  input_textcolor.style["color"] = colorString;
//}
//
//input_backgroundcolor.addEventListener("input", function() {
//  console.log("background color");
//  var input_length = input_backgroundcolor.value.length;
//  if (input_length == 3 || input_length == 6) {
//    setBGColor(input_backgroundcolor.value);
////    updateURL();
//  }
//});

//var baseURL = window.location.origin + window.location.pathname;
//
//function updateURL() {
//  var stateObj = { text: text.value };
//  history.replaceState(stateObj, "", baseURL + "?b=" + encodeURIComponent(input_textcolor.value) + "&c=" + encodeURIComponent(input_backgroundcolor.value) + "&a=" + encodeURIComponent(text.value));
//}


//text.addEventListener("input", function() {
//  updateURL();
//});
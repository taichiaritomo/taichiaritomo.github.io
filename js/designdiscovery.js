var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
  setTimeout(function() {
    window.location.href = page;
  }, 200);
}

window.onload = function () {
  document.querySelector("#main").classList.remove("disappear");
};




var p2_section_pattern = document.querySelector("#p2-crystals");








/************************* UTILITY AND POLYFILLS *****************************/

// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             // IE Fallback, you can even fallback to onscroll
             function(callback){ window.setTimeout(callback, 1000/60) };


// VERTICAL POSITION
var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
var pY = function() {
  return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
}



/************************* SCROLL ***************************/

var lastPosition;

// Returns true iff the element is not completely off the screen.
function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top + 20 - viewHeight >= 0);
}

// Returns true iff the element is at least 50% in the screen.
function checkMostlyVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < viewHeight/2 || rect.top - viewHeight/2 >= 0);
}

function checkHalfPast(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var elmHeight = rect.bottom - rect.top;
  return (rect.top < (viewHeight - elmHeight)*0.6);
}


function loop(){
  var y = pY();
    
    // Didn't scroll
    if (lastPosition == y) { // Avoid calculations if not needed
        scroll( loop );
        return false;
    }
    // Scrolled
    else {
      lastPosition = y;

      // Video Auto-play Logic
      scroll( loop );
      
      if (checkHalfPast(p2_section_pattern)) {
        p2_section_pattern.classList.add("state2");
        // switch to state 2
      } else {
        p2_section_pattern.classList.remove("state2");
        // switch to state 1
      }
    }
}

loop(); // Call the loop for the first time
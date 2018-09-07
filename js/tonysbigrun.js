// LOADING

window.onload = function () {
  document.querySelector("#main").classList.remove("disappear");
  layout();
  preloader();
};

window.addEventListener("resize", function() {
  layout();
});

var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
  setTimeout(function() {
    window.location.href = page;
  }, 200);
}



// VIDEO

var vid = document.querySelector("#video_tonysbigrun");

vid.addEventListener("ended", function(event) {
  vid.currentTime = 0;
    if (checkMostlyVisible(v)) {
        vid.play();
    }
});

vid.play();







function preloader() {
  // create object
  imageObj = new Image();

  // start preloading
  for(var i = 0; i <= 4; i++) 
  {
    imageObj.src="../img/tonysbigrun/sprites/tony" + i + ".png";
    console.log(imageObj.src);
  }
}


var iconGridParameters = {
  "icon1" : {
    left: -1,
    top: -1
  },
  "icon2" : {
    left: 1,
    top: -1,
  },
  "icon3" : {
    left: 3,
    top: -1
  },
  "icon4" : {
    left: -2,
    top: 0
  },
  "icon5" : {
    left: 2,
    top: 0
  },
  "icon6" : {
    left: -3,
    top: 1
  },
  "icon7" : {
    left: 1,
    top: 1
  },
  "icon11" : {
    left: -1,
    top: 1
  },
  "icon12" : {
    left: 3,
    top: 1
  },
  "icon9" : {
    left: -2,
    top: 2
  },
  "icon10" : {
    left: 0,
    top: 2
  },
  "icon8" : {
    left: 2,
    top: 2
  },
  "icon13" : {
    left: -3,
    top: -1
  }
};

//var lastPosition = -1;
var h = Math.max(document.documentElement.clientHeight, window.innerHeight);
var w = Math.max(document.documentElement.clientWidth, window.innerWidth);

var icongrid = document.querySelector("#icongrid");
var icons = document.getElementsByClassName("icon");
var tonysprite = document.querySelector("#tonysprite");

// Default positioning of page elements based on screen size.
layout = function() {
  console.log("layout");
  
  h = Math.max(document.documentElement.clientHeight, window.innerHeight);
  w = Math.max(document.documentElement.clientWidth, window.innerWidth);
  
  
  // Tony's Big Run
  
  var lrg = 75, // large version dimension
      sml = 50,
      minIconPadding = 8, // margin on a single side
      unitDim = Math.max(w/7, 137),
//      unitDim = Math.max(w/7, h/4.7),
      iconDim = (unitDim > lrg + 2*minIconPadding ? lrg : sml),
//      iconDim = (w > 700 ? lrg : sml),
      margin  = (unitDim - iconDim)/2;
//      originX = (w - 250 - 15)/2; // assuming w is greater than 265 and that landscape layout is going to be used
  
  console.log(iconDim);
//  console.log(lrg + 2*minIconPadding);
  
  var originX = Math.max(w/2, 480); // correct origin to equalize grid margins.
  icongrid.style.left = originX + "px";
  // place icons
  console.log(Object.keys(iconGridParameters));
  Object.keys(iconGridParameters).forEach(function (key) {
    console.log(key);
    var elem = document.getElementById(key);
    elem.style.left = iconGridParameters[key].left * unitDim + "px";
    elem.style.top = iconGridParameters[key].top * 96 + "px";
  });
}






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

var lastPosition;



// Animation Frames
var FRAMES = ["tony1.png", "tony2.png", "tony3.png", "tony4.png", "tony0.png"];

// Sprite animation
var spriteFrame = 4, 
    resetTimer = null, 
    animationTimer = null;

// Reverts Sprite to default frame and cancels animations.
var clearSpriteFrame = function() {
  clearTimeout(animationTimer);
  animationTimer = null;
  clearTimeout(animationTimer);
  spriteFrame = 4; // Set to default standing
  tonysprite.src = "../img/tonysbigrun/sprites/" + FRAMES[spriteFrame];
};

var iconOrder1 = [1, 4, 2];
var iconOrder2 = [7, 11, 10, 5, 3, 9, 12, 8, 6, 13];
var tbrAnimated1 = false;
var tbrAnimated2 = false;

function loop(){
  var y = pY();
  
  if (lastPosition == y) { // Avoid calculations if not needed
      scroll( loop );
      return false;
  } else {
    // animate tony sprite
    lastPosition = y;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(clearSpriteFrame, 250);
    if (animationTimer == null) {
      spriteFrame = (spriteFrame+1)%4;
      tonysprite.src = "../img/tonysbigrun/sprites/" + FRAMES[spriteFrame];
      animationTimer = setTimeout(function() { animationTimer = null; }, 250);
    }
    
    if (!tbrAnimated1 && y > h/4) {
      tbrAnimated1 = true;
      for (var i = 0; i < iconOrder1.length; i++) {
        (function(j) {
          setTimeout(function(){
            document.getElementById("icon" + iconOrder1[j]).classList.add("popped");
//            $("#icon" + iconOrder1[j]).addClass("popped");
          }, (100*j));
       })(i);
      }
    }
    
    if (!tbrAnimated2 && y > h/3) {
      tbrAnimated2 = true;
      for (var i = 0; i < iconOrder2.length; i++) {
        (function(j) {
          setTimeout(function(){
            document.getElementById("icon" + iconOrder2[j]).classList.add("popped");
//            $("#icon" + iconOrder2[j]).addClass("popped");
          }, (100*j));
       })(i);
      }
    }  
    
    scroll( loop );
  }
}

loop(); // Call the loop for the first time



// DEBOUNCE
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
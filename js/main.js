/* UTILITY AND POLYFILLS */

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
// var pX = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;

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

// Scroll back to the top on reload
$(window).on('unload', function() {
//  $("#color-bg").css("display", "none");
  $(window).scrollTop(0);
});

// Disable image dragging
$('img').on('dragstart', function(event) { event.preventDefault(); });
 

/********************************** LAYOUT ***********************************/

var lastPosition = -1;
var h = $(window).height();
var w = $(window).width();
var docH = $(document).height();

// Default positioning of page elements based on screen size.
layout = function() {
  // Tony's Big Run
  
  // Retrieve from CSS
  var infoWidth = 250;
  var rightMargin = 15;
  
  var lrg = 75, // large version dimension
      sml = 50,
      minIconPadding = 8, // margin on a single side
      unitDim = Math.max(w/7, h/4.7),
//      unitDim = Math.max(w/7, h/4.7),
      iconDim = (unitDim > lrg + 2*minIconPadding ? lrg : sml),
//      iconDim = (w > 700 ? lrg : sml),
      margin  = (unitDim - iconDim)/2,
      originX = (w - 250 - 15)/2; // assuming w is greater than 265 and that landscape layout is going to be used
  
  console.log(iconDim);
//  console.log(lrg + 2*minIconPadding);
  
  originX += w/2 - (originX + unitDim); // correct origin to equalize grid margins.
  if (w < 501) originX = w/2; // center if it's too much to the side
  $("#icongrid").css({left: originX + "px"});
  
  // set icon sizes
  $(".icon").css({height: iconDim, width: iconDim, marginLeft: -iconDim/2, marginTop: -iconDim/2});
  if (iconDim == 50)
    $("#tonysprite").css({height: "74px", width: "28px", marginTop: "-37px", marginLeft: "-14px", backgroundSize: "28px 74px"});
  else
    $("#tonysprite").css({height: "111px", width: "42px", marginTop: "-55.5px", marginLeft: "-21px", backgroundSize: "42px 111px"});
  
  // place icons
  $("#icon1").css({left : -unitDim + "px",   top : -unitDim + "px"});
  $("#icon2").css({left : unitDim + "px",    top : -unitDim + "px"});
  $("#icon3").css({left : 3*unitDim + "px",  top : -unitDim + "px"});
  $("#icon4").css({left : -2*unitDim + "px", top : 0});
  $("#icon5").css({left : 2*unitDim + "px",  top : 0});
  $("#icon6").css({left : 4*unitDim + "px",  top : 0});
  $("#icon7").css({left : unitDim + "px",    top : unitDim + "px"});
  $("#icon11").css({left : -unitDim + "px",   top : unitDim + "px"});
  $("#icon12").css({left : 3*unitDim + "px",   top : unitDim + "px"});
  $("#icon9").css({left : -2*unitDim + "px", top : 2*unitDim + "px"});
  $("#icon10").css({left : 0,                top : 2*unitDim + "px"});
  $("#icon8").css({left : 2*unitDim + "px", top : 2*unitDim + "px"});
  
  // EFCC
//  var scaledHeights = [0, 0.25, 0.5, 0.7]; // height scale values for sheet SVGs
  var adjustedDim = 200*(1280/w);
//  var adjustedHeight = 200*(800/(0.7*h)); // assuming all SVGs' native heights were 800
  for (var s = 1; s <= 4; s++) {
    var svgDoc = document.getElementById("sheet" + s).contentDocument;
    svgDoc.querySelector("pattern").setAttribute('width', adjustedDim);
    svgDoc.querySelector("pattern").setAttribute('height', adjustedDim);
    svgDoc.querySelector("pattern image").setAttribute('width', adjustedDim);
    svgDoc.querySelector("pattern image").setAttribute('height', adjustedDim);
  }
}

var loadingMessages = [
  "Calculating Anime Eye Light Refraction",
  "Loading Loadables",
  "Destructive Editing",
  "Reticulating Splines",
  "Loading 99.999999999%",
  "Allocating Butter on the Kernel",
  "Calibrating Texture Positions",
  "Planting Data Trees",
  "Counting 64-bit Integers",
  "Caching Gizmos",
  "Deleting Opera Polyfills",
  "Anti-aliasing Squiggles",
  "Turning Off and On Again",
  "Parallaxing Everything",
  "Razzling Dazzle"
];
var loadingSequence = setInterval(function() {
  $("#loading").html(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
}, 750);

$(window).load(function() {
  setTimeout(function() { 
    clearInterval(loadingSequence);
    $("#loading").html("Done");
    $("#color-bg").css("opacity", 1);
    $("#loading").css("opacity", 0);
    $("html").css("overflow", "visible");
  }, 1500);
  layout();
});

var debouncedLayout = debounce(function() {
  layout();
}, 250);

// Recalculate layout on resize
$(window).resize(function() {
  h = $(window).height();
  w = $(window).width();
  docH = $(document).height();
  debouncedLayout();
});


/********************************** ANIMATION ********************************/

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
  $("#tonysprite").css("background-image", "url('img/tonysbigrun/sprites/" + FRAMES[spriteFrame] + "')");
};

var iconOrder1 = [1, 4, 2];
var iconOrder2 = [7, 11, 10, 5, 3, 9, 12, 8, 6];
var tbrAnimated1 = false;
var tbrAnimated2 = false;
var efccAnimated = false;

function loop(){
  var y = pY();
  
  if (lastPosition == y) { // Avoid calculations if not needed
      scroll( loop );
      return false;
  } else {
    // animate tony sprite
    lastPosition = y;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(clearSpriteFrame, 300);
    if (animationTimer == null) {
      spriteFrame = (spriteFrame+1)%4;
      $("#tonysprite").css("background-image", "url('img/tonysbigrun/sprites/" + FRAMES[spriteFrame] + "')");
      animationTimer = setTimeout(function() { animationTimer = null; }, 300);
    }

//    $("#icongrid").css("top", ((y+2000)/(h+2000))*37 + "%"); // icongrid parallax
    if (y < 1.5*h) $("#color-bg").css("top", y/10 + "px");
//    if (y > 1.5*h) $("#footer-bg").css("top", (y - (docH - h))/10 + "px"); 
    if (y > 0.5*h) $("#tonysbigrun .info").css("bottom", ((y-h)/10 + "px"));
    if (y > 1.5*h) $("#efcc .info").css("bottom", ((y-2*h)/10 - 30 + "px"));
    
    if (!tbrAnimated1 && y > h/4) {
      tbrAnimated1 = true;
      for (var i = 0; i < 3; i++) {
        (function(j) {
          setTimeout(function(){
            $("#icon" + iconOrder1[j]).addClass("popped");
          }, (100*j));
       })(i);
      }
    }
    
    if (!tbrAnimated2 && y > h/3) {
      tbrAnimated2 = true;
      for (var i = 0; i < 9; i++) {
        (function(j) {
          setTimeout(function(){
            $("#icon" + iconOrder2[j]).addClass("popped");
          }, (100*j));
       })(i);
      }
    }  
    
    scroll( loop );
  }
}

loop(); // Call the loop for the first time
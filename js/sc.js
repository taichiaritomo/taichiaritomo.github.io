// LOADING

window.onload = function () {
  document.querySelector("#main").classList.remove("disappear");
  setTimeout(loadAnimation(0), 0);
};

var goTo = function(page) {
//  document.getElementById("back-gradient").classList.add("slide");
  document.getElementById("main").classList.add("disappear");
  setTimeout(function() {
    window.location.href = page;

  }, 200);
}

var goToSection = function(section) {
  window.location.href = section;
}





// ANIMATED ICONS
var animated_icons = [
  {
    offset: 500,
    src: "../img/sc/tour/go-plus_animation.gif"
  },
  {
    offset: 2500,
    src: "../img/sc/tour/ad-free_animation.gif"
  },
  {
    offset: 1000,
    src: "../img/sc/tour/heart_animation.gif"
  }
];

var animated_icon_elements = document.getElementsByClassName("feature-icon");

function loadAnimation(i, offset) {
  setTimeout(function() {
    animated_icon_elements[i].src = animated_icons[i].src;
    i++;
    if (i < animated_icons.length) {
      loadAnimation(i, animated_icons[i].offset);
    }
  }, offset);
  
}


// CHECKOUT

checkout_variations = {
  "Purchasing Go" : "../img/sc/checkout_variations/Go%20Purchase.svg",
  "Purchasing Go+" : "../img/sc/checkout_variations/Go+%20Purchase.svg",
//  "Purchasing Go, with free trial" : "../_img/sc/checkout_variations/Go%20Trial.svg",
  "Purchasing Go+, with free trial" : "../img/sc/checkout_variations/Go+%20Trial.svg",
//  "Purchasing Go, with Pro Unlimited Discount" :
//  "../_img/sc/checkout_variations/Go%20Purchase,%20Pro%20Unlimited.svg",
  "Purchasing Go+, with Pro Unlimited Discount" :
  "../img/sc/checkout_variations/Go+%20Purchase,%20Pro%20Unlimited.svg",
  "Downgrading from Go+ to Go, Saved Credit Card" :
  "../img/sc/checkout_variations/Go%20Downgrade,%20Saved%20Card.svg",
  "Upgrading from Go to Go+, Saved Credit Card" :
  "../img/sc/checkout_variations/Go+%20Upgrade,%20Saved%20Card.svg",
  "Downgrading from Go+ to Go, New Credit Card" :
  "../img/sc/checkout_variations/Go%20Downgrade,%20New%20Card.svg",
  "Upgrading from Go to Go+, New Credit Card" :
  "../img/sc/checkout_variations/Go+%20Upgrade,%20New%20Card.svg"
//  "Downgrading from Go+ to Go, Apple App Store" :
//  "../_img/sc/checkout_variations/Go%20Downgrade,%20Apple%20Error.svg",
//  "Upgrading from Go to Go+, Apple App Store" :
//  "../_img/sc/checkout_variations/Go+%20Upgrade,%20Apple%20Error.svg"
}

feature_checkout_final_img = document.querySelector("#checkout_final .big-image");
checkout_variations_keys = Object.keys(checkout_variations);
checkout_variations_index = 0;

setInterval(function() {
  feature_checkout_final_img.src=checkout_variations[checkout_variations_keys[checkout_variations_index]];
  checkout_variations_index = (checkout_variations_index + 1) % 8;
}, 750);



// SUBSCRIPTION SETTINGS

settings_variations = {
  "No subscription" : "../img/sc/settings_variations/subscription-settings_none.png",
  "Go+" : "../img/sc/settings_variations/subscription-settings_Go+.png",
  "Go+, Pro Unlimited" : "../img/sc/settings_variations/subscription-settings_all.png",
  "Go+, Pro Unlimited, Specs" :
  "../img/sc/settings_variations/subscription-settings_all_guides.png",
  "Edit payment info" :
  "../img/sc/settings_variations/subscription-settings_use-a-different-card.png"
}

feature_settings_final_img = document.querySelector("#settings_final .big-image");
settings_variations_keys = Object.keys(settings_variations);
settings_variations_index = 0;

setInterval(function() {
  feature_settings_final_img.src=settings_variations[settings_variations_keys[settings_variations_index]];
  settings_variations_index = (settings_variations_index + 1) % 5;
}, 750);






// VIDEO ADS
var ad_cards_container = document.querySelector("#image-container_feed-cards");
var ad_cards = document.querySelector("img#image_feed-cards");

var ad_video = document.querySelector("#video_sc-ad");

ad_video.addEventListener("ended", function(event) {
  ad_video.currentTime = 0;
    if (checkMostlyVisible(v)) {
        v.play();
    }
});




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
      
      if (checkMostlyVisible(ad_video)) {
        ad_video.play();
      }
      
      if (checkVisible(ad_cards_container)) {
        var rect = ad_cards_container.getBoundingClientRect();
        ad_cards.style["top"] = ((rect.top - ad_cards_container.clientHeight)/3) + "px";
      }
    }
}

loop(); // Call the loop for the first time

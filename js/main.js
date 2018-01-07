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


/********************************** LAYOUT ***********************************/


//var lastPosition = -1;
var d = document,
    w = window.innerWidth,
    h = window.innerHeight,
    y = d.body.height;


//var menuOpen = true;
//$('#page-tracker').click(function() {
//  console.log('click received');
//  if (menuOpen) {
//    var menuWidth = $('#menu').css('width');
//    menuWidth = menuWidth.substring(0, menuWidth.length - 2);
//    console.log(menuWidth);
//    $('#menu').css('left', (-menuWidth + 44) + 'px');
//  }
//  else {
//    $('#menu').css('left', '0');
//  }
//  menuOpen = !menuOpen
//});

///* array of page anchors */
//var workTags = ["soundcloud", "tonysbigrun", "tedxrutgers", "efcc", "illustrations"],
//    workIDs  = {soundcloud: 0, tonysbigrun: 1, tedxrutgers: 2, efcc: 3, illustrations: 4};
//
///* array of section tiles in the menu */
//var work_tiles = document.getElementsByClassName('work_tile');
//for (i = 0; i < work_tiles.length; i++) {
//  work_tiles[i].addEventListener("click", function(e) { openSection(e); });
//}
//
//function openSection(event) {
//  console.log("Jump to section: " + event.toElement.classList[1]);
//  d.querySelector("#work").style.width = w + "px";
//  event.toElement.style.height = h + "px";
//  location.hash = "#" + event.toElement.classList[1];
////  console.log("openSection " + "sectionIndex");
////  d.querySelector("#work").style.width = w + "px";
////  console.log(work_tiles);
////  console.log(sectionIndex);
////  work_tiles[sectionIndex].style.height = h + "px";
//}






/************************** INFO *****************************/


// Object that stores each section's y position in the document
var SectionData = [];

// Calculates each section's y position in the document
function Initialize_SectionData() {
    var section_elements = document.getElementsByTagName("section");
    for (var i = 0; i < section_elements.length; i++) {
        var rect = section_elements[i].getBoundingClientRect(),
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        SectionData.push({
            element: section_elements[i],
            y: rect.top + pY() - (0.4*window.innerHeight)
        });
    }
    console.log("Section Data: ");
    console.log(SectionData);
}

Initialize_SectionData();

// Recalculate section data when resized
/** DEBOUNCE(RESIZE) --> sldkfjlskdjf */




// Most recently displayed info element
var lastSectionIndex;
var button_info = document.querySelector("#button_info");
var showInfo = false;

// Returns the current section in view as an html element
function getCurrentSectionIndex() {
    var y = pY();
    var prev = 0; // counter for previously examined section 
    for (var i = 0; i < SectionData.length; i++) {
        if (SectionData[i].y >= y) {
            break;
        }
        prev = i;
    }
    return prev;
}

function toggleInfo() {
    // Show info for current section
    if (!showInfo) {
        var currentSectionIndex = getCurrentSectionIndex();
        var currentSectionInfo = SectionData[currentSectionIndex].element.querySelector(".section_info");
        currentSectionInfo.classList.add("visible");
        lastSectionIndex = currentSectionIndex;
        button_info.innerHTML = "<strong>HIDE INFO</strong>"
    }
    // Hide info for last displayed section
    else {
        SectionData[lastSectionIndex].element.querySelector(".section_info").classList.remove("visible");
        lastSectionIndex = null;
        button_info.innerHTML = "<strong>SHOW INFO</strong>"
    }
    showInfo = !showInfo;
}

button_info.addEventListener("click", toggleInfo);




/************* VIDEO **************/
//var autoplayed = false;
//var video = document.getElementById("demo");
//document.querySelector(".phone").addEventListener("mouseenter", function(event) {
//  if (autoplayed) {
//    video.play();
//  }
//});
//
//video.addEventListener("ended", function(event) {
//  $(".replay-info").addClass("visible");
//});
//
//video.addEventListener("playing", function(event) {
//  $(".replay-info").removeClass("visible");
//});


var sc_video_1 = document.querySelector("#video_sc-go-onboarding");
var sc_video_2 = document.querySelector("#video_sc-ad");

var videos = [];

videos.push({element: sc_video_1, autoplayed: false});
videos.push({element: sc_video_2, autoplayed: false});

console.log(videos);

for (var i = 0; i < videos.length; i++) {
    var v = videos[i].element;
    v.addEventListener("ended", function(event) {
        v.currentTime = 0;
        if (checkMostlyVisible(v)) {
            v.play();
        }
    });
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
        
        // Displayed Info Logic
        if (showInfo) {
            var currentSectionIndex = getCurrentSectionIndex();
            
            // Change displayed info if section changed
            if (currentSectionIndex != lastSectionIndex) {
                SectionData[lastSectionIndex].element.querySelector(".section_info").classList.remove("visible");
                SectionData[currentSectionIndex].element.querySelector(".section_info").classList.add("visible");
                lastSectionIndex = currentSectionIndex;
                
                console.log("Current Section: " + currentSectionIndex);
            }
        }
        
        // Video Auto-play Logic
        
        
        scroll( loop );
        
        for (var i = 0; i < 2; i++) {
            if (checkMostlyVisible(videos[i].element)) {
                videos[i].element.play();
            }
        }
    }
}

loop(); // Call the loop for the first time











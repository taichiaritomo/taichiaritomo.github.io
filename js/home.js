window.onpageshow = function () {
  if (document.readyState === "complete")
    showMain();
};

window.onload = function() {
  showMain();
}

function showMain() {
  var circleWipe = document.querySelector("#circle-wipe");
    circleWipe.classList.add("done");
  
  setTimeout(function() {
    document.querySelector("#loading-container").style.display = "none";
    document.querySelector("#main").classList.remove("disappear");
  }, 200);
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop + el.clientHeight/2, left: rect.left + scrollLeft + el.clientWidth/2 }
}

/* Kiss: Hover Flood Effect*/
var kiss_img = document.querySelector('#kiss_hover');
var myHtml = document.querySelector('html');
var bg = document.querySelector('#bg-gradient');


if (Modernizr.touch) {
  // for touchscreens
  kiss_img.addEventListener('touchstart', floodKiss);
  kiss_img.addEventListener('touchend', clearKiss);
} else {
  kiss_img.addEventListener('mouseenter', floodKiss);
  kiss_img.addEventListener('mouseleave', clearKiss);
}

function floodKiss() {
  var myOffset = offset(kiss_img);
  bg.style.backgroundPosition = (myOffset.left) + 'px ' + (myOffset.top) + 'px';
  bg.classList.add('flood');
}

function clearKiss() {
  bg.classList.remove('flood');
}


//kiss_img.style.top = Math.random()*(window.innerHeight-64) + "px";
//kiss_img.style.left = Math.random()*(window.innerWidth-64) + "px";


var myEmail = document.querySelector("#email");
myEmail.addEventListener("click", function() {
  myEmail.innerHTML = "&#116;&#097;&#105;&#099;&#104;&#105;&#046;&#097;&#114;&#105;&#116;&#111;&#109;&#111;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;";
})


/****** Controls: Category Selector ******/
var items = document.getElementsByClassName('item');
var buttonInterfaces = document.querySelector('#category-control_interfaces');
var buttonGraphics = document.querySelector('#category-control_graphics');
var showItems = {
  interfaces: true,
  graphics: true
};
// Helper function that hides everything without given categoryName (string).
var showOnlyCategory = function(categoryName) {
  for (var i = 0; i < items.length; i++) {
    var element = items[i];
    if (!element.classList.contains(categoryName)) {
      var img = element.querySelector('img');
      img.style.visibility = "hidden";
    }
  }
}



/****** Links ******/
var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
//  document.getElementById("bg-gradient").classList.add("slide");
  setTimeout(function() {
    window.location.href = page;

  }, 200);
}



document.addEventListener("touchstart", function(){}, true);




//Make the DIV element draggagle:
dragElement(document.getElementById("kiss_hover"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    if (Modernizr.touch) {
      // for touchscreens
      document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
    } else {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    }
    
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    if (Modernizr.touch) {
      // for touchscreens
      elmnt.ontouchstart = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    if (Modernizr.touch) {
      // for touchscreens
      document.ontouchend = closeDragElement;
      // call a function whenever the cursor moves:
      document.ontouchmove = elementDrag;
    } else {
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    if (Modernizr.touch) {
      // for touchscreens
      document.ontouchend = null;
      document.ontouchmove = null;
    } else {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}







//var showAnyInCategory = function(categoryName) {
//  for (var i = 0; i < items.length; i++) {
//    var element = items[i];
//    if (element.classList.contains(categoryName)) {
//      var img = element.querySelector('img');
//      img.style.visibility = "visible";
//    }
//  }
//}
//// Category: Interfaces
//buttonInterfaces.addEventListener('click', function() {
//  if (showItems.interfaces) {
//    buttonInterfaces.classList.remove('selected');
//    showOnlyCategory('graphics');
//    showItems.interfaces = false;
//  } else {
//    buttonInterfaces.classList.add('selected');
//    showAnyInCategory('interfaces');
//    showItems.interfaces = true;
//  }
//});
//// Category: Graphics
//buttonGraphics.addEventListener('click', function() {
//  if (showItems.graphics) {
//    buttonGraphics.classList.remove('selected');
//    showOnlyCategory('interfaces');
//    showItems.graphics = false;
//  } else {
//    buttonGraphics.classList.add('selected');
//    showAnyInCategory('graphics');
//    showItems.graphics = true;
//  }
//});
  
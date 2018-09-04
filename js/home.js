window.onload = function () {
    document.querySelector("#main").classList.remove("disappear");
};

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop + el.clientHeight/2, left: rect.left + scrollLeft + el.clientWidth/2 }
}

/* Kiss: Hover Flood Effect*/
var kiss_img = document.querySelector('.kiss_hover');
var myHtml = document.querySelector('html');
var bg = document.querySelector('#bg-gradient');
kiss_img.addEventListener('mouseenter', function() {
  var myOffset = offset(kiss_img);
  bg.style.backgroundPosition = (myOffset.left) + 'px ' + (myOffset.top) + 'px';
  bg.classList.add('flood');
});
kiss_img.addEventListener('mouseleave', function() {
  bg.style.backgroundPosition = 'top left';
  bg.classList.remove('flood');
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

/****** Links ******/
var goTo = function(page) {
  document.getElementById("main").classList.add("disappear");
//  document.getElementById("bg-gradient").classList.add("slide");
  setTimeout(function() {
    window.location.href = page;

  }, 200);
}

  
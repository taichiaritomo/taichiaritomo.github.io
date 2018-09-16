var constellation_elements = {
  "interfaces" : {
    elements : ["interest_interfaces", "item_soundcloud", "item_lookas", "item_deformgrid", "item_tonysbigrun"],
    group : "constellation-group_interfaces"
  },
  "slice-of-life comics" : {
    elements : ["interest_comics", "link_goodreads", "item_illustrations"],
    group : "constellation-group_comics"
  },
  "architecture history" : {
    elements : ["interest_architecture", "link_goodreads", "item_designdiscovery"],
    group : "constellation-group_architecture"
  },
  "japanese electronica" : {
    elements : ["interest_electronica", "link_soundcloud"],
    group : "constellation-group_electronica"
  }
};

var constellationContainer = document.querySelector("#constellation-container");

// Draws constellation using key string as category.
function mapConstellation(key) {
  
  constellationContainer.style.height = document.body.scrollHeight + "px";
  
  var elementArray = constellation_elements[key].elements;
//  var constellationGroup = document.getElementById(constellation_elements[key].group);

  // Draw complete graph between elements of constellation group
  for (var i = 0; i < elementArray.length; i++) {
    var el_i = document.getElementById(elementArray[i]);
    var el_i_offset = offset(el_i);
    var i_x = el_i_offset.left;
    var i_y = el_i_offset.top;

    for (var j = i+1; j < elementArray.length; j++) {
      var el_j = document.getElementById(elementArray[j]);
      var el_j_offset = offset(el_j);
      var j_x = el_j_offset.left;
      var j_y = el_j_offset.top;
      var edge = document.createElementNS('http://www.w3.org/2000/svg','line');
      edge.setAttribute("x1", i_x);
      edge.setAttribute("y1", i_y);
      edge.setAttribute("x2", j_x);
      edge.setAttribute("y2", j_y);
      edge.setAttribute("style", "stroke:#00f; stroke-width:1");
      constellationContainer.appendChild(edge);
    }
  }
}

var constellationKeys = document.getElementsByClassName("constellation-key");
for (var i = 0; i < constellationKeys.length; i++) {
  var constellationKey = constellationKeys[i];
  console.log(constellationKey);
  constellationKey.addEventListener("mouseenter", function(e) {
    mapConstellation(e.target.textContent);
  });
  constellationKey.addEventListener("mouseleave", function(e) {
    constellationContainer.innerHTML = "";
  });
  
  constellationKey.textContent;
}
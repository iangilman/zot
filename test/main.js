$(document).ready(function() {
  zot.assert(false, "test assert");
  
  var left = 20;
  var top = 30;
  var width = 40;
  var height = 50;
  var pad = 10;
  var $test = $("<div>")
    .css({
      position: "absolute",
      left: left,
      top: top,
      width: width,
      height: height,
      padding: pad + "px"
    })
    .appendTo("body");
    
  var box = zot.bounds($test);
  zot.assert(box.left == left, "left");
  zot.assert(box.top == top, "top");
  zot.assert(box.width == width, "width");
  zot.assert(box.height == height, "height");
  zot.assert(box.css().left == left, "css left");
  zot.assert(box.css().top == top, "css top");
  zot.assert(box.css().width == width, "css width");
  zot.assert(box.css().height == height, "css height");
  zot.assert(box.right() == left + width, "right");
  zot.assert(box.bottom() == top + height, "bottom");
  zot.assert(box.center().x == left + (width / 2), "center x");
  zot.assert(box.center().y == top + (height / 2), "center y");
  
  box = zot.outerBounds($test);
  zot.assert(box.left == left, "outer left");
  zot.assert(box.top == top, "outer top");
  zot.assert(box.width == width + (pad * 2), "outer width");
  zot.assert(box.height == height + (pad * 2), "outer height");

  var $window = $(window);
  box = zot.bounds($window);
  zot.assert(box.left == 0, "window left");
  zot.assert(box.top == 0, "window top");
  zot.assert(box.width == $window.width(), "window width");
  zot.assert(box.height == $window.height(), "window height");

  // TODO: centeredOn, union, point constructor, rect constructor
  
  $("<div>")
    .text("done")
    .appendTo("body");
});
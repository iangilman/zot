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
  zot.assert(box.right() == left + width, "right");
  zot.assert(box.bottom() == top + height, "bottom");
  zot.assert(box.center().x == left + (width / 2), "center x");
  zot.assert(box.center().y == top + (height / 2), "center y");
  
  // TODO: outerBounds, centeredOn, union, css
  
  $("<div>")
    .text("done")
    .appendTo("body");
});
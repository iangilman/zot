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
  
  var range = new zot.range(10, 20);
  zot.assert(range.start == 10, "range start");
  zot.assert(range.end == 20, "range end");
  zot.assert(range.extent() == 10, "range extent");
  zot.assert(range.mid() == 15, "range mid");
  zot.assert(range.scale(0.9) == 19, "range scale 0.9");
  zot.assert(range.scale(1.1) == 20, "range scale 1.1");
  zot.assert(range.scale(-0.1) == 10, "range scale -0.1");
  zot.assert(range.proportion(19) == 0.9, "range proportion 19");
  zot.assert(range.proportion(21) == 1, "range proportion 21");
  zot.assert(range.proportion(9) == 0, "range proportion 9");
  zot.assert(range.scaleUnclipped(0.9) == 19, "range scaleUnclipped 0.9");
  zot.assert(range.scaleUnclipped(1.1) == 21, "range scaleUnclipped 1.1");
  zot.assert(range.scaleUnclipped(-0.1) == 9, "range scaleUnclipped -0.1");
  zot.assert(range.proportionUnclipped(19) == 0.9, "range proportionUnclipped 19");
  zot.assert(range.proportionUnclipped(21) == 1.1, "range proportionUnclipped 21");
  zot.assert(range.proportionUnclipped(9) == -0.1, "range proportionUnclipped 9");

  // TODO: centeredOn, union, point constructor, rect constructor, *InPage
  
  $("<div>")
    .text("done")
    .appendTo("body");
});
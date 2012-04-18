$(document).ready(function() {
  zot.assert(false, "test assert");
  zot.assertProperties({there: true}, "there justTesting");
  
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
  zot.assert(box.topLeft().x == left, "topLeft x");
  zot.assert(box.topLeft().y == top, "topLeft y");
  zot.assert(box.topRight().x == left + width, "topRight x");
  zot.assert(box.topRight().y == top, "topRight y");
  zot.assert(box.bottomLeft().x == left, "bottomLeft x");
  zot.assert(box.bottomLeft().y == top + height, "bottomLeft y");
  zot.assert(box.bottomRight().x == left + width, "bottomRight x");
  zot.assert(box.bottomRight().y == top + height, "bottomRight y");
  
  var inset = box.insetBy(5, 7);
  zot.assert(inset.left == left + 5, "inset left");
  zot.assert(inset.top == top + 7, "inset top");
  zot.assert(inset.width == width - 10, "inset width");
  zot.assert(inset.height == height - 14, "inset height");
  
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
  
  var p1 = new zot.point(30, 50);
  var p2 = new zot.point(10, 20);
  zot.assert(p1.x == 30, "point x");
  zot.assert(p1.y == 50, "point y");
  zot.assert(p1.plus(p2).x == 40, "point plus x");
  zot.assert(p1.plus(p2).y == 70, "point plus y");
  zot.assert(p1.minus(p2).x == 20, "point minus x");
  zot.assert(p1.minus(p2).y == 30, "point minus y");
  zot.assert(p1.times(p2).x == 300, "point times x");
  zot.assert(p1.times(p2).y == 1000, "point times y");
  zot.assert(p1.dividedBy(p2).x == 3, "point divided by x");
  zot.assert(p1.dividedBy(p2).y == 2.5, "point divided by y");

  // TODO: centeredOn, union, rect constructor, *InPage
  
  $("<div>")
    .text("done")
    .appendTo("body");
});
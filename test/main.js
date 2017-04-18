/*globals zot */

$(document).ready(function() {
  /*globals console */
  console.log('We expect two asserts to fail: "test assert" and "must have justTesting property"');
  zot.assert(false, 'test assert');
  zot.assertProperties({ there: true }, 'there justTesting');

  var epsilon = 0.000001;
  var left = 20;
  var top = 30;
  var width = 40;
  var height = 50;
  var pad = 10;
  var $test = $('<div>')
    .css({
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      padding: pad + 'px'
    })
    .appendTo('body');

  var box = zot.bounds($test);
  zot.assert(box.left === left, 'left');
  zot.assert(box.top === top, 'top');
  zot.assert(box.width === width, 'width');
  zot.assert(box.height === height, 'height');
  zot.assert(box.css().left === left, 'css left');
  zot.assert(box.css().top === top, 'css top');
  zot.assert(box.css().width === width, 'css width');
  zot.assert(box.css().height === height, 'css height');
  zot.assert(box.right() === left + width, 'right');
  zot.assert(box.bottom() === top + height, 'bottom');
  zot.assert(box.center().x === left + (width / 2), 'center x');
  zot.assert(box.center().y === top + (height / 2), 'center y');
  zot.assert(box.topLeft().x === left, 'topLeft x');
  zot.assert(box.topLeft().y === top, 'topLeft y');
  zot.assert(box.topRight().x === left + width, 'topRight x');
  zot.assert(box.topRight().y === top, 'topRight y');
  zot.assert(box.bottomLeft().x === left, 'bottomLeft x');
  zot.assert(box.bottomLeft().y === top + height, 'bottomLeft y');
  zot.assert(box.bottomRight().x === left + width, 'bottomRight x');
  zot.assert(box.bottomRight().y === top + height, 'bottomRight y');

  var inset = box.insetBy(5, 7);
  zot.assert(inset.left === left + 5, 'inset left');
  zot.assert(inset.top === top + 7, 'inset top');
  zot.assert(inset.width === width - 10, 'inset width');
  zot.assert(inset.height === height - 14, 'inset height');

  box = zot.outerBounds($test);
  zot.assert(box.left === left, 'outer left');
  zot.assert(box.top === top, 'outer top');
  zot.assert(box.width === width + (pad * 2), 'outer width');
  zot.assert(box.height === height + (pad * 2), 'outer height');

  var $window = $(window);
  box = zot.bounds($window);
  zot.assert(box.left === 0, 'window left');
  zot.assert(box.top === 0, 'window top');
  zot.assert(box.width === $window.width(), 'window width');
  zot.assert(box.height === $window.height(), 'window height');

  box = new zot.rect(10, 20, 100, 200);
  zot.assert(box.left === 10, 'left for constructor');
  zot.assert(box.top === 20, 'top for constructor');
  zot.assert(box.width === 100, 'width for constructor');
  zot.assert(box.height === 200, 'height for constructor');

  var box2 = new zot.rect(30, 40, 100, 100);
  zot.assert(box.intersects(box2), 'intersects');
  var box3 = box.intersection(box2);
  zot.assert(box3.left === 30, 'left for intersection');
  zot.assert(box3.top === 40, 'top for intersection');
  zot.assert(box3.width === 80, 'width for intersection');
  zot.assert(box3.height === 100, 'height for intersection');

  box3 = box.union(box2);
  zot.assert(box3.left === 10, 'left for union');
  zot.assert(box3.top === 20, 'top for union');
  zot.assert(box3.width === 120, 'width for union');
  zot.assert(box3.height === 200, 'height for union');

  box2.left = 500;
  zot.assert(box.intersects(box2) === false, 'non-intersection');
  box3 = box.intersection(box2);
  zot.assert(box3.left === 0, 'left for non-intersection');
  zot.assert(box3.top === 0, 'top for non-intersection');
  zot.assert(box3.width === 0, 'width for non-intersection');
  zot.assert(box3.height === 0, 'height for non-intersection');

  var range = new zot.range(10, 20);
  zot.assert(range.start === 10, 'range start');
  zot.assert(range.end === 20, 'range end');
  zot.assert(range.extent() === 10, 'range extent');
  zot.assert(range.mid() === 15, 'range mid');
  zot.assert(range.scale(0.9) === 19, 'range scale 0.9');
  zot.assert(range.scale(1.1) === 20, 'range scale 1.1');
  zot.assert(range.scale(-0.1) === 10, 'range scale -0.1');
  zot.assert(range.proportion(19) === 0.9, 'range proportion 19');
  zot.assert(range.proportion(21) === 1, 'range proportion 21');
  zot.assert(range.proportion(9) === 0, 'range proportion 9');
  zot.assert(range.scaleUnclipped(0.9) === 19, 'range scaleUnclipped 0.9');
  zot.assert(range.scaleUnclipped(1.1) === 21, 'range scaleUnclipped 1.1');
  zot.assert(range.scaleUnclipped(-0.1) === 9, 'range scaleUnclipped -0.1');
  zot.assert(range.proportionUnclipped(19) === 0.9, 'range proportionUnclipped 19');
  zot.assert(range.proportionUnclipped(21) === 1.1, 'range proportionUnclipped 21');
  zot.assert(range.proportionUnclipped(9) === -0.1, 'range proportionUnclipped 9');

  var p1 = new zot.point(30, 50);
  var p2 = new zot.point(10, 20);
  zot.assert(p1.x === 30, 'point x');
  zot.assert(p1.y === 50, 'point y');
  zot.assert(p1.plus(p2).x === 40, 'point plus x');
  zot.assert(p1.plus(p2).y === 70, 'point plus y');
  zot.assert(p1.minus(p2).x === 20, 'point minus x');
  zot.assert(p1.minus(p2).y === 30, 'point minus y');
  zot.assert(p1.times(p2).x === 300, 'point times x');
  zot.assert(p1.times(p2).y === 1000, 'point times y');
  zot.assert(p1.dividedBy(p2).x === 3, 'point divided by x');
  zot.assert(p1.dividedBy(p2).y === 2.5, 'point divided by y');

  var polars = [
    new zot.polar(0, 50),
    new zot.polar(-Math.PI / 2, 50),
    new zot.polar(Math.PI / 2, 50),
    new zot.polar(Math.PI, 50)
  ];

  var points = [
    new zot.point(50, 0),
    new zot.point(0, -50),
    new zot.point(0, 50),
    new zot.point(-50, 0)
  ];

  $.each(polars, function(a, polar) {
    var p3 = polar.point();
    zot.assert(Math.abs(p3.x - points[a].x) < epsilon, 'polar point x ' + a);
    zot.assert(Math.abs(p3.y - points[a].y) < epsilon, 'polar point y ' + a);
    zot.assert(p3.polar().distance === polar.distance, 'polar distance ' + a);
    zot.assert(p3.polar().radians === polar.radians, 'polar radians ' + a);
  });

  // Scale
  var scale = new zot.scale().from(50, 100).to(100, 200);
  zot.assert(scale.scale(25) === 50, 'scale1 before');
  zot.assert(scale.scale(50) === 100, 'scale1 start');
  zot.assert(scale.scale(75) === 150, 'scale1 mid');
  zot.assert(scale.scale(100) === 200, 'scale1 end');
  zot.assert(scale.scale(125) === 250, 'scale1 beyond');
  zot.assert(scale.invert(150) === 75, 'scale1 invert');

  scale = new zot.scale().from(50, 100).to(100, 200).clamp(true);
  zot.assert(scale.scale(25) === 100, 'scale1 clamped before');
  zot.assert(scale.scale(50) === 100, 'scale1 clamped start');
  zot.assert(scale.scale(75) === 150, 'scale1 clamped mid');
  zot.assert(scale.scale(100) === 200, 'scale1 clamped end');
  zot.assert(scale.scale(125) === 200, 'scale1 clamped beyond');

  scale = new zot.scale().from(50, 100).to(200, 100);
  zot.assert(scale.scale(25) === 250, 'scale2 before');
  zot.assert(scale.scale(50) === 200, 'scale2 start');
  zot.assert(scale.scale(75) === 150, 'scale2 mid');
  zot.assert(scale.scale(100) === 100, 'scale2 end');
  zot.assert(scale.scale(125) === 50, 'scale2 beyond');

  scale = new zot.scale().from(50, 100).to(200, 100).clamp(true);
  zot.assert(scale.scale(25) === 200, 'scale2 clamped before');
  zot.assert(scale.scale(50) === 200, 'scale2 clamped start');
  zot.assert(scale.scale(75) === 150, 'scale2 clamped mid');
  zot.assert(scale.scale(100) === 100, 'scale2 clamped end');
  zot.assert(scale.scale(125) === 100, 'scale2 clamped beyond');

  // Event
  var obj = {
    emit: function() {
      console.log('emit', arguments);
    }
  };

  zot.event.props(obj, {
    foo: 12
  });

  zot.assert(obj.foo === 12, 'foo === 12');
  obj.foo++;
  zot.assert(obj.foo === 13, 'foo === 13');

  // TODO: centeredOn, subscribable, *InPage

  $('<div>')
    .text('done')
    .appendTo('body');
});

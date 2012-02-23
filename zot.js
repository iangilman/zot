/// Copyright 2012, Ian Gilman
/// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function(){

  // ==========
  if ("zot" in window)
    throw Error("There's already a zot defined!");
    
  // ==========
  window.zot = {
    // ----------
    assert: function(condition, message) {
      if (condition)
        return;
        
      if ("console" in window)
        console.error("ASSERT FAILED: " + message);
    }, 
    
    // ----------
    bounds: function($el) {
      var pos = $el.offset() || {left: 0, top: 0};
      return new this.rect(pos.left, pos.top, $el.width(), $el.height());
    },

    // ----------
    outerBounds: function($el) {
      var pos = $el.offset() || {left: 0, top: 0};
      return new this.rect(pos.left, pos.top, $el.outerWidth(), $el.outerHeight());
    }
  } 

  // ==========
  zot.point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // ==========
  zot.rect = function(left, top, width, height) {
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
  }
  
  zot.rect.prototype = {
    // ----------
    right: function(value) {
      if (typeof value == "undefined")
        return this.left + this.width;
        
      this.width = value - this.left;
    },
    
    // ----------
    bottom: function(value) {
      if (typeof value == "undefined")
        return this.top + this.height;
        
      this.height = value - this.top;
    },
    
    // ----------
    center: function() {
      return new zot.point(
        this.left + (this.width / 2), 
        this.top + (this.height / 2)
      );
    },
    
    // ----------
    centeredOn: function(point) {
      return new zot.rect(point.x - (this.width / 2), 
        point.y - (this.height / 2), 
        this.width, 
        this.height
      );
    },
    
    // ----------
    union: function(rect) {
      var left = Math.min(this.left, rect.left);
      var top = Math.min(this.top, rect.top);
      var right = Math.max(this.right(), rect.right());
      var bottom = Math.max(this.bottom(), rect.bottom());
      return new zot.rect(left, top, right - left, bottom - top);
    }, 
    
    // ----------
    css: function() {
      return {
        left: left,
        top: top,
        width: width,
        height: height
      };
    }
  };
  
})();

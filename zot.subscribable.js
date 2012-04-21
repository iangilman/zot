/// zot.subscribable 0.01
/// Copyright 2012, Ian Gilman
/// http://iangilman.com
/// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function(){

  // ==========
  if (!("zot" in window))
    throw Error("Requires zot!");
    
  // ==========
  zot.subscribable = {
    // ----------
    subscribe: function(key, typeOrCallback, callback) {
      zot.assert(key, "key must exist");
      
      var type = "*"; 
      if (callback !== undefined) {
        type = typeOrCallback;
        zot.assert(type && typeof type == "string", "type must be a non-empty string");
      } else {
        callback = typeOrCallback;
      }

      zot.assert(typeof callback == "function", "callback must be a function");
      
      if (!this._subscriptions)
        this._subscriptions = {};
        
      if (!this._subscriptions[type])
        this._subscriptions[type] = [];
        
      for (var a = 0; a < this._subscriptions[type].length; a++) {
        var sub = this._subscriptions[type][a];
        if (sub.key == key) {
          sub.callback = callback;
          return;
        }
      }
      
      this._subscriptions[type].push({
        key: key, 
        callback: callback
      });
    }, 
    
    // ----------
    unsubscribe: function(key, type) {
      zot.assert(key, "key must exist");
      
      if (!this._subscriptions)
        return;

      if (type === undefined) {
        for(var t in this._subscriptions)
          this._unsubscribeByType(key, t);
      } else {
        zot.assert(type && typeof type == "string", "type must be a non-empty string");
        this._unsubscribeByType(type);
      }
    }, 
    
    // ----------
    _unsubscribeByType: function(key, type) {
      if (!this._subscriptions || !this._subscriptions[type])
        return;

      for (var a = 0; a < this._subscriptions[type].length; a++) {
        var sub = this._subscriptions[type][a];
        if (sub.key == key) {
          this._subscriptions[type].splice(a, 1);
          return;
        }
      }
    }, 
    
    // ----------
    _publish: function(type, data) {
      data = data || {};
      data.type = type;
      data.from = this;
      this._publishByType(type, data);
      this._publishByType("*", data);
    }, 
    
    // ----------
    _publishByType: function(type, data) {      
      if (!this._subscriptions || !this._subscriptions[type])
        return;
      
      for (var a = 0; a < this._subscriptions[type].length; a++) {
        var sub = this._subscriptions[type][a];
        sub.callback(data);
      }
    },

    // ----------
    _observable: function(name, value) {
      this[name] = function(newValue) {
        if (newValue === undefined)
          return value;
          
        if (newValue == value)
          return;
          
        value = newValue;
        this._publish("change:" + name, {value: value});
      };
    }
  };
    
})();

/// zot.event 0.1.0
/// Copyright 2015, Ian Gilman
/// https://github.com/iangilman/zot
/// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function(){
  /*globals zot */

  // ----------
  if (!('zot' in window))
    throw new Error('Requires zot!');

  // ----------
  zot.event = {
    props: function(obj, properties) {
      zot.assert(obj.emit, 'obj must have emit method');

      var makeProp = function(key, value) {
        Object.defineProperty(obj, key, {
          get: function() {
            return value;
          },
          set: function(newValue) {
            if (newValue === value) {
              return;
            }

            value = newValue;

            if (obj.emit) {
              obj.emit('change:' + key);
            }
          }
        });                
      };

      for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
          makeProp(key, properties[key]);
        }
      }
    }
  };
    
})();

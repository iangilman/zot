/// zot.event 0.1.2
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
    
  // ----------
  // Creates jQuery-style accessors for the given vars, as well as underscore-prefixed properties to match.
  // When the values change, a change event is emitted in the form 'change:varname'.
  // The vars argument is an object where the keys are vars to be created and the values are the defaults for those vars.
  zot.vars = function(obj, vars) {
    zot.assert(obj.emit, 'obj must have emit method');

    var makeVar = function(key, value) {
      var _key = '_' + key;
      zot.assert(!obj[key], 'obj already has ' + key);
      zot.assert(!obj[_key], 'obj already has ' + _key);

      obj[_key] = value;

      obj[key] = function(newValue) {
        if (newValue === undefined) {
          return obj[_key];
        }

        if (newValue === obj[_key]) {
          return;
        }

        obj[_key] = newValue;
        obj.emit('change:' + key);
        obj.emit('change', {
          key: key,
          value: newValue
        });
      };
    };

    for (var key in vars) {
      if (vars.hasOwnProperty(key)) {
        makeVar(key, vars[key]);
      }
    }
  };

})();

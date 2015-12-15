// zot-node 0.0.2
// Copyright 2015, Ian Gilman
// https://github.com/iangilman/zot
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

module.exports = {
  // ----------
  asyncEach: function(list, iterator, completion) {
    var index = -1;
    var savedErr = null;

    if (typeof list.length !== 'number' || isNaN(list.length)) {
      completion(savedErr);
      return;
    }

    var next = function(err) {
      if (err && !savedErr) {
        savedErr = err;
      }

      index++;

      if (index >= list.length) {
        completion(savedErr);
        return;
      }

      iterator(list[index], index, next);
    };

    next();
  },

  // ----------
  parseJSON: function(json, success, failure) {
    try {
      success(JSON.parse(json));
    } catch (err) {
      failure(err);
    }
  },

  // ----------
  checker: function(success, failure) {
    return function(err) {
      if (err) {
        failure(err);
      } else {
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
          args.push(arguments[i]);
        }

        success.apply(null, args);
      }
    };
  }
};

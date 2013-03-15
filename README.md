# What is it?

Some handy utilities I like to have around, mostly geometry at the moment. 

# Usage

Just grab zot.js and use it on your page. 

Geometry classes include zot.point, zot.rect and zot.range. There are some helper methods for getting the boundary rectangle off of jQuery objects (though zot does not depend on jQuery). 

There's also a super simple assert: `zot.assert(a == 2, "a should be equal to 2");` 

More documentation to come; for now you'll have to read the code. 

This library is still very young; some of the APIs are likely to change in future versions. 

# Subscribable

zot.subscribable.js is an optional add-on that allows you to give event publish/subscribe features to your objects.

# To Do 

* Make a minimized version
* Node compatibility
* Copy constructors for geometry
* Make zot.rect, etc, return a new object even if you don't call new
* Grunt/Travis

# Subscribable To Do

* Documentation/example
* Tests
* More input checking

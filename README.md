tinydi
======

Tiny Dependency Injection for the browser


## Usage

```javascript
di.reg('multiply', function() {
  return function(a, b) {
    return a * b
  }
})

di.reg('square', function(multiply) {
  return function(a) {
    return multiply(a, a)
  }
})

di.run(function(square) {
  square(4)
})
```
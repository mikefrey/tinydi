tinydi
======

Tiny Dependency Injection for the browser

## Features

* Very small. < 60 SLOC, < 1kb minified
* Resolves via function arguments or dependency array
* Resolves registered modules and variables on `window`
* No external dependencies


## Limitations

* Does not support module loading
* Does not support circular dependencies
* Function arg resolution breaks with minification


## Basic Usage

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

// in your on DOM Ready...
di.start()
```



## API

### di.reg(name, fn)

Registers a module with the given name and function. Resolves dependencies using fn arguments list.

```javascript
di.reg('Car', function(Engine, Wheels, Chassis) {
  function Car() {
    // ...
  }
  return Car
})
```

### di.reg(name, array)

Registers a module with the given name and function.
The last item in the array must be the module function.
Resolves dependencies using the strings provided in the array.

```javascript
di.reg('Car', ['Engine', 'Wheel', 'Chassis', function(Engine, Wheels, Chassis) {
  function Car() {
    // ...
  }
  return Car
}])
```

### di.run(fn)

Registers a function to be run when `di.start()` is called.
Functions are run in the order they are registered.
Resolves dependencies using fn arguments list.

```javascript
di.run(function(Car) {
  var car = new Car()
  car.drive()
})
```

### di.run(array)

Registers a function to be run when `di.start()` is called.
Functions are run in the order they are registered.
The last item in the array must be the module function.
Resolves dependencies using the strings provided in the array.

```javascript
di.run(['Car', function(Car) {
  var car = new Car()
  car.drive()
}])
```

### di.start()

Runs the modules registered with `di.run()`.
Call this whenever you'd like your application to start,
such as onDomReady.

```javascript
// using jQuery
$(di.start)
```
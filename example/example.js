window.$ = function(arg) {
  return function() {
    console.log('global object', arg)
  }
}

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

di.reg('globalTest', function($) {
  return $('tested')
})

di.run(function(square, globalTest) {
  console.log('the square of 4 is', square(4))
  globalTest()
})

di.start()
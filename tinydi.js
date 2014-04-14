
var registry = {}

var di = {

  registry: {},

  reg: function(name, fn) {
    var args = di._getArgs(fn)
    di.registry[name] = {
      fn: fn,
      args: args,
      instance: null
    }
    return di
  },

  run: function(fn) {
    if (typeof fn === 'string') {
      return di.exec(fn)
    }
  },

  exec: function(name) {
    // get fn by name and exec, cacheing the result in the registry
  },

  _getArgs: function(fn) {
    var args = []
    var rx = /^function[^\(]*\(([^\)]*)\)/i
    var argStr = rx.match(fn.toString())[1]

    if (argStr && argStr.length) {
      args = argStr.replace(/\s/g, '').split(/,/)
    }
    return args
  }

}

var di = {

  runners: [],
  registry: {},

  reg: function(name, fn) {
    var args = di._getArgs(fn)
    if (Array.isArray(fn)) fn = fn.shift()
    di.registry[name] = {
      fn: fn,
      args: args,
      instance: null
    }
    return di
  },

  run: function(fn) {
    var args = di._getArgs(fn)
    if (Array.isArray(fn)) fn = fn.shift()
    di.runners.push({ fn: fn, args: args })
    return di
  },

  start: function() {
    di.runners.forEach(function(entry) {
      di._exec(entry)
    })
  },

  _exec: function(entry) {
    var deps = di._resolve(entry.args)
    var inst = entry.fn.apply(null, deps)
    if (entry.name) entry.instance = inst
    return inst
  },

  _resolve: function(args) {
    var deps = args.map(function(arg) {
      var entry = di.registry[arg]

      if (entry && entry.instance)
        return entry.instance

      if (entry)
        return di._exec(entry)

      if (window[arg])
        return window[arg]

      throw new Error('Cannot resolve dependency "' + arg '"')
    })
  },

  _getArgs: function(fn) {
    if (Array.isArray(fn)) return fn.slice(0, fn.length-2)
    var args = []
    var rx = /^function[^\(]*\(([^\)]*)\)/i
    var argStr = rx.match(fn.toString())[1]

    if (argStr && argStr.length) {
      args = argStr.replace(/\s/g, '').split(/,/)
    }
    return args
  }

}

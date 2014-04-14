var noop = function(){}
var noop2 = function(a, b){}

describe('tinydi', function() {

  beforeEach(function() {
    di.registry = {}
    di.runners = []
  })

  describe('.reg()', function() {

    it('should register with a function', function() {
      di.reg('name', noop)
      expect(di.registry['name'].fn).toBe(noop)
    })

    it('should register with an array', function() {
      di.reg('name', [noop])
      expect(di.registry['name'].fn).toBe(noop)
    })

    it('should register with function and deps', function() {
      di.reg('name', noop2)
      expect(di.registry['name'].args[0]).toBe('a')
      expect(di.registry['name'].args[1]).toBe('b')
    })

    it('should register with array and deps', function() {
      di.reg('name', ['a', 'b', noop])
      expect(di.registry['name'].args[0]).toBe('a')
      expect(di.registry['name'].args[1]).toBe('b')
    })

    it('should be chainable', function() {
      var id = di.reg('name', noop)
      expect(id).toBe(di)
    })

  })

  describe('.run()', function() {

    it('should register with function', function() {
      di.run(noop)
      expect(di.runners[0].fn).toBe(noop)
    })

    it('should register with array', function() {
      di.run([noop])
      expect(di.runners[0].fn).toBe(noop)
    })

    it('should register with function and deps', function() {
      di.run(noop2)
      expect(di.runners[0].args[0]).toBe('a')
      expect(di.runners[0].args[1]).toBe('b')
    })

    it('should register with array and deps', function() {
      di.run(['a', 'b', noop])
      expect(di.runners[0].args[0]).toBe('a')
      expect(di.runners[0].args[1]).toBe('b')
    })

    it('should be chainable', function() {
      var id = di.run(noop)
      expect(id).toBe(di)
    })

  })

  describe('.start()', function() {

    it('should execute registered runners', function() {
      var spy = jasmine.createSpy()
      di.run([spy])
      expect(spy).not.toHaveBeenCalled()
      di.start()
      expect(spy).toHaveBeenCalled()
    })

  })

  describe('Resolution', function() {

    xit('should resolve dependencies on the global object', function() {

    })

    xit('should resolve deeply', function() {

    })

  })

})
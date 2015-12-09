

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

import { assert } from 'chai';

import CoreController from './some-component';

let component;

describe('some-component', function() {

    beforeEach(function() {
        component = new SomeComponent();
    });

    it('should start with default counter value = 20', function () {
        assert.equal(component.counter, 20);
    });

    it('should accept initial counter value as dependency', function () {
        component = new SomeComponent(30);
        assert.equal(component.counter, 30);
    });

    it('should increment counter value after increment is called', function () {
        assert.equal(component.counter, 20);
        component.increment();
        assert.equal(component.counter, 21);
    });

});
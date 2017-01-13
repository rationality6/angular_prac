'use strict';

describe('phoneDetail', function () {

  // Load the module that contains the `phoneDetail` component before each test
  beforeEach(module('phoneDetail'));

  // Test the controller
  describe('PhoneDetailController', function () {
    var $httpBackend, ctrl;
    var xyzPhoneData = {
      name: 'phone xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function ($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData);

      $routeParams.phoneId = 'xyz';

      ctrl = $componentController('phoneDetail');
    }));

    it('should fetch the phone details', function () {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.phone).toEqual({});

      $httpBackend.flush();
      expect(ctrl.phone).toEqual(xyzPhoneData);
    });

  });

  it('should simulate promise', inject(function ($q, $rootScope) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    var resolvedValue;

    promise.then(function (value) { resolvedValue = value; });
    expect(resolvedValue).toBeUndefined();

    // Simulate resolving of promise
    deferred.resolve(123);
    // Note that the 'then' function does not get called synchronously.
    // This is because we want the promise API to always be async, whether or not
    // it got called synchronously or asynchronously.
    expect(resolvedValue).toBeUndefined();

    // Propagate promise resolution to 'then' functions using $apply().
    $rootScope.$apply();
    expect(resolvedValue).toEqual(123);
  }));

});

'use strict';

var INTEGER_REGEXP = /^-?\d+$/;

angular
  .module('formList')
  .component('formListComponent', {
    templateUrl: 'form/form-list.template.html',
    controller: ['$scope', function($scope) {
      $scope.master = {};

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
      };

      $scope.reset = function(form) {
        if (form) {
          form.$setPhristine();
          form.$setUntouched();
        }
        $scope.user = angular.copy($scope.master);
      };
      $scope.reset();
    }]
  })
  .directive('integer', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.integer = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if (INTEGER_REGEXP.test(viewValue)) {
            // it is valid
            return true;
          }

          // it is invalid
          return false;
        };
      }
    };
  })
  .directive('username', function($q, $timeout) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

        ctrl.$asyncValidators.username = function(modelValue, viewValue) {

          if (ctrl.$isEmpty(modelValue)) {
            // consider empty model valid
            return $q.resolve();
          }

          var def = $q.defer();

          $timeout(function() {
            // Mock a delayed response
            if (usernames.indexOf(modelValue) === -1) {
              // The username is available
              def.resolve();
            } else {
              def.reject();
            }

          }, 2000);

          return def.promise;
        };
      }
    };
  })
  .directive('overwritenEmail', function() {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

    return {
      require: '?ngModel',
      link: function(scope, elm, attrs, ctrl) {
        // only apply the validator if ngModel is present and Angular has added the email validator
        if (ctrl && ctrl.$validators.email) {

          // this will overwrite the default Angular email validator
          ctrl.$validators.email = function(modelValue) {
            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
          };
        }
      }
    };
  });

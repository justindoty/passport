angular.module('app', []);

angular.module('app').controller("PassportController", ['$http', function($http){
  var vm = this;

  vm.message = 'Hello!';

}]);

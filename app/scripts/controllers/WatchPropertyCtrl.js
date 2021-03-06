'use strict';

angular.module('app')
  .controller('WatchPropertyCtrl', function ($scope, $firebase, $rootScope) {
    $scope.homeStatus = 'watchList';

    $scope.tabs = [
      {
        title: 'Property for Sale',
        view: 'views/tabs/watchHome/watchSale.html'
      },
      {
        title: 'Property for Rent',
        view: 'views/tabs/watchHome/watchRent.html'
      }
    ];
  });


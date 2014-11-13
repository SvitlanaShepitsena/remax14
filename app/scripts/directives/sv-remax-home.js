'use strict';

angular.module('app')
  .directive('svRemaxHome', function (AddSearchFeaturesService, InitialValuesService, BrokerService, HomeService, $stateParams, $state, $rootScope, urlSale, urlRental) {
    return {
      restrict: 'E',
      templateUrl: '../../views/directives/sv-remax-home.html',
      scope: {
        isDraft: '=',
        isRent: '='
      },

      controller: function ($scope) {
        this.required = ['mls', 'state', 'city', 'zip'];
      },

      link: function ($scope, element, attr) {
        var url = $scope.isRent ? urlRental : urlSale;
        var mls = $stateParams.mls;
        $scope.isTemplate = mls ? false : true;
        $scope.home = HomeService.getArrayFire(url, mls, $scope.isDraft);
        $scope.isDataLoading = true;
        $scope.home.$loaded(function () {
          $scope.home = InitialValuesService.seed($scope.home, $scope.isTemplate);
          $scope.isDataLoading = false;
        })

        $scope.moveToTrash = function () {
          HomeService.moveToTrash();
        };

        $scope.saveTemplate = function () {
          $scope.home = BrokerService.addBroker($scope.home, $rootScope.user);
          $scope.home = AddSearchFeaturesService.decorate($scope.home);
          HomeService.saveToDrafts($scope.home).then(function (result) {
            $state.go("app.profile.drafts");
          });
        };

        $scope.updateHomeSection = function (section) {
          section = AddSearchFeaturesService.decorateSection(section);
          HomeService.updateHomeSection(section);
        };

        $scope.onUCUploadComplete = function (info) {
          if (_.isUndefined($scope.home[0].images)) {
            $scope.home[0].images = [];
          }
          $scope.home[0].images.push(info.cdnUrl);
          var test='test';

        };
      }
    };
  });

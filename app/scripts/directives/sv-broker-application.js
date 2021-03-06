'use strict';

angular.module('app')
  .directive('svBrokerApplication', function (BrokerApplicationService, $popover, notifications, $rootScope) {
    return {
      restrict: 'E',
      replace: true,
      template: '<button class="btn btn-default btn-block">Apply for Broker Account</button>',
      scope: {
        fName: '=',
        lName: '=',
        email: '='
      },
      link: function ($scope, element, attr) {
        var user = $rootScope.user;

        $scope.applicant = {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email
        }

        $scope.submitBrokerApp = function () {
          $scope.applicant = _.extend($scope.applicant,{
            id:$rootScope.user.id
          });
          BrokerApplicationService.apply($scope.applicant).then(function () {

            toastr.success(notifications.brokerAppSubmitted);
          });

        };
        var brokerPopover = $popover(element, {
          container: 'body',
          template: '../../views/popover/broker-application-popover.html',
          placement: 'bottom',
          scope: $scope
        });
      }
    };
  });

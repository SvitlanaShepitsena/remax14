'use strict';

angular.module('app')
  .directive('svHomePanel', function (HousesFrontImagesService, $famous, $window) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '../../views/directives/sv-home-panel.html',
      link: function ($scope, element, attr) {
        $scope.showInfo = function (home, $done) {
          home.opacity.set(1,{duration:1000});
        };

        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];

        var defaultAngle = -Math.PI / 5;
        $scope.myTransform = Transform.multiply(Transform.scale(1,1,1),  Transform.perspective(1000));
        $scope.w = $window.innerWidth;
        $scope.h = $window.innerHeight/3;

        $scope.hsm = 0.9* $scope.h;
        $scope.wsm = 1.5* $scope.hsm;

        $scope.myStyle = {
          "width" : $scope.w+"px",
          "height" : $scope.h+"px"
        };

        HousesFrontImagesService.all().then(function (homes) {
          $scope.homes = _.map(homes, function (home) {
            var angle = new Transitionable(defaultAngle);
            var opacity = new Transitionable(0);

            return _.extend(home, {
              angle: angle,
              opacity:opacity
            })

          });
        });
        var EventHandler = $famous['famous/core/EventHandler'];

        $scope.colors = ['red', 'green', 'blue', 'orange', 'yellow'];
        $scope.getColor = function () {
          var index = Math.floor(Math.random() * 5);
          return $scope.colors[index];
        };
        $scope.handler = new EventHandler();
      }
    }
  });

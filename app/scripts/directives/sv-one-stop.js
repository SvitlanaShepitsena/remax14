'use strict';

angular.module('app')
  .directive('svOneStop', function ($famous) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '../../views/directives/sv-one-stop.html',
      scope: {},
      link: function ($scope, element, attr) {
        /*global famous*/
// import dependencies
        var Engine = famous.core.Engine;
        var Modifier = famous.core.Modifier;
        var Transform = famous.core.Transform;
        var ImageSurface = famous.surfaces.ImageSurface;
        var isOrbit = false;

// create the main context
        var ang_element = angular.element(element);
        var orbitDom = ang_element[0];
        var mainContext = Engine.createContext(orbitDom);

// your app here
        var logo = new ImageSurface({
          size: [108, 108],
          content: 'images/header/one-stop-img.png',
          classes: ['trans-origin']
        });

        var initialTime = Date.now();
        var centerSpinModifierOrbit = new Modifier({
          origin: [0.5, 0.5],
          align: [0.5, 0.5],
          transform: function () {
            return Transform.rotateY(.002 * (Date.now() - initialTime));
          }
        });
        var centerSpinModifier = new Modifier({
          origin: [0.5, 0.5],
          align: [0.5, 0.5]
        });
        var orbit = $('#rotation-sign');
        mainContext.add(centerSpinModifier).add(logo);

        orbit.on('mouseover', function () {
          //centerSpinModifier.setTransform(Transform.rotateY(.002 * (Date.now() - initialTime)));
        mainContext.add(centerSpinModifierOrbit).add(logo);
        })
        orbit.on('mouseout', function () {
          //centerSpinModifier.setTransform(Transform.rotateY(.002 * (Date.now() - initialTime)));
        mainContext.add(centerSpinModifier).add(logo);
        })
      }
    };
  });

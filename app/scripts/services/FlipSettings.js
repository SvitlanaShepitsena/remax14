'use strict';

angular.module('app')
  .factory('flipSettings', function () {
    var screenSizeLimit = 960;
    var largeScreenPart = 0.5;
    var smallScreenPart = 1;
    var percentHeight = 0.5;

    var smallDeviceLimit = 700;
    var smallDeviceWidthNormalizer = 0.83;
    var proportions = 1.5;

    var angle = -Math.PI / 2;
    var duration = 1000;
    var curve = 'linear';
    var finalOpacity = 0.9;
    var resetDelayTime = 0.95;
    var paddingPercent = 0.03;

    return {
      screenSizeLimit: screenSizeLimit,
      smallDeviceLimit: smallDeviceLimit,
      smallDeviceWidthNormalizer: smallDeviceWidthNormalizer,
      percentHeight: percentHeight,
      smallScreenPart: smallScreenPart,
      largeScreenPart: largeScreenPart,
      proportions: proportions,

      angle: angle,
      duration: duration,
      curve: curve,
      bookStyle: function (width) {
        return {
          boxShadow: '0 3px 12px -5px rgba(139, 139, 139, 139)',
          padding: paddingPercent * width + 'px'
        }
      },
      finalOpacity: finalOpacity,
      resetDelay: resetDelayTime * duration
    };
  });
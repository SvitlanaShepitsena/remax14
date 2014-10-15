'use strict';

angular.module('app')
  .controller('MainCtrl', function ($scope, $firebase, url, $firebaseSimpleLogin, $state, $rootScope) {

    $(window).resize(function () {
      $scope.$apply(function () {
      });
    });

    $scope.fenElementActive = {val: 'null'};

    $scope.$watch('auth.user.provider', function (newVal) {
      if (newVal === 'password') {
        $scope.isAdmin = true;
      }
    })

    var mainRef = new Firebase(url);
    $scope.auth = $firebaseSimpleLogin(mainRef);

    $scope.auth.$getCurrentUser().then(function (user) {

      if ((user === null)) {
        return;
      }
      if (user.provider === 'facebook') {
        $rootScope.user = user;
        $scope.userLink = user.thirdPartyUserData.link;
        $scope.userName = user.thirdPartyUserData.first_name;
        $scope.userPic = user.thirdPartyUserData.picture.data.url;

        $scope.firstName = user.thirdPartyUserData.first_name;
        $scope.lastName = user.thirdPartyUserData.last_name;
        $scope.email = user.thirdPartyUserData.email;
      }
      if (user.provider === 'password') {
        $scope.isAdmin = true;
        $scope.userName = 'Admin';
        $scope.userPic = 'Admin';
      }
    })

    $scope.fenLogout = function () {
      $scope.auth.$logout();
      $scope.userLink = null;
      $scope.userName = null;
      $scope.userPic = null;
      $scope.isAdmin = null;
      $rootScope.user= null;
      $state.go('app.home', null, {reload: true});
    }

    $scope.loginFb = function () {
      $scope.auth.$login('facebook',
        {
          rememberMe: true,
          scope: 'email,user_likes'
        }
      ).then(function (user) {
          $rootScope.user = user;
          $scope.userLink = user.thirdPartyUserData.link;
          $scope.userName = user.thirdPartyUserData.first_name;

          $scope.firstName = user.thirdPartyUserData.first_name;
          $scope.lastName = user.thirdPartyUserData.last_name;
          $scope.email = user.thirdPartyUserData.email;

          $scope.userPic = user.thirdPartyUserData.picture.data.url;
          $state.go('app.profile.user-profile', null, {reload: true});
        });
    }
  });

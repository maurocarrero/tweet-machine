'use strict';

// API
var mcmApi = (function () {
  return {
    init: function () {

      // METHOD METHOD
      if (typeof Function.prototype.method !== 'function') {
        Function.prototype.method = function (name, fn) {
          if (!this.prototype[name] || typeof this.prototype[name] !== 'function') {
            this.prototype[name] = fn;
          }
          return this;
        };
      }

      // REMOVES TEXT NODES FROM NODE LIST
      if (!Object.prototype.removeTextNodes || typeof Object.prototype.removeTextNodes !== 'function') {
        Object.prototype.removeTextNodes = function () {
          var that = this;
          if (this.children instanceof HTMLCollection) {
            angular.forEach(that.childNodes, function (node) {
              if (node.nodeType !== 1) {
                that.removeChild(node);
              }
            });
          }
        };
      }

    }
  };
})();

angular
  .module('tweetMachineApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    mcmApi.init();
  });
